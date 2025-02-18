require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors())
// app.use(express.static('dist'))

// assigner les valeurs d'environnements a des variables

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const secretKey = process.env.SECRET_KEY

// connexion a la db

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

db.connect((error) => {
    if (error) {
        console.error("Erreur de connexion Mysql : ", error)
    } else {
        console.log('connected');
    }
})

// route pour la creation d'une session stripe

app.post('/create-checkout-session', (request, response) => {
    const cart = request.body.cart
    const token = request.headers['authorization'].split(' ')[1]

    if (!token){
        return response.json({message: 'Token Manquant'})
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return response.json({message: 'Token invalide'})
        }

        const userID = decoded.id

        db.query('select utilisateurs_adresse_email from utilisateurs WHERE utilisateurs_id = ?', userID, (error, result) => {
            if (error) {
                return response.json({message: 'erreur de base de donnees' })
            }
            if (result.length === 0) {
                return response.json({message: 'utilisateur not found'})
            }

            const userEmail = result[0].utilisateurs_adresse_email

            // on mappe les donnees a ce que stripe attend
            const line_items = cart.map(item => ({
                price_data: {
                    currency: 'eur', // devise en euro
                    product_data: {
                        name: item.nom, // le nom du produit
                    },
                    unit_amount: Math.round(item.prix * 100), // on multiplie par 100 parce que stripe attend ce format
                },
                quantity: item.quantite, // on recupere la quantite d'articles
            }))

            stripe.checkout.sessions.create({
                line_items: line_items, // on definit les produits de cart
                mode: 'payment', // on definit le paiement
                customer_email: userEmail,

                // il permet d'ajouter une adresse de livraison
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ['FR']
                },

                // Options de livraison
                shipping_options: [
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 0,  // Expédition gratuite
                                currency: 'eur'
                            },
                            display_name: 'Expedition gratuite',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 7},
                                maximum: { unit: 'business_day', value: 14}
                            }
                        }
                    },
                    {
                        shipping_rate_data: {
                            type: 'fixed_amount',
                            fixed_amount: {
                                amount: 1500,  // Expédition rapide
                                currency: 'eur'
                            },
                            display_name: 'Livraison Express',
                            delivery_estimate: {
                                minimum: { unit: 'business_day', value: 3},
                                maximum: { unit: 'business_day', value: 5}
                            }
                        }
                    }
                ],
                success_url: 'http://localhost:5173/success', // redirection une fois le paiement reussi
                cancel_url: 'http://localhost:5173/cancel' // redirection une fois le paiement echoue   
            })
            .then(session => {
                // on permet de sauvegarder la commande dans la base de donnees
                const orderData = {
                    user_id: userID, // on attribue l'id du client a user_id
                    product_details: JSON.stringify(cart), // on stocke les details de la commande au format json
                    orderStatus: 'en cours de traitement' // status de base de la commande
                }
                
                // on insere les donnees
                db.query('insert into orders (user_id, product_details, order_status) values (?, ?, ?)', [orderData.user_id, orderData.product_details, orderData.orderStatus], (error, result) => {
                    if (error) {
                        // on affiche une erreur
                        console.log('erreur lors de la sauvegarde')
                    }
                })

                response.json({url: session.url}) // on affiche l'url de la session qui a etait creer
            })
            .catch(error => {
                console.log('Erreur Stripe :', error);
            })
        })
    })
})

// modification du profil

app.put('/utilisateurs/modificationProfil', (request, response) => {
    const token = request.headers['authorization'].split(' ')[1] // recuperation du token
    const {utilisateurs_nom, utilisateurs_prenom, utilisateurs_adresse_email, utilisateurs_numero_de_telephone} = request.body

    // on verifie la presence du token dans le header
    if(!token) {
        return response.json({message: 'aucun token'})
    }

    // on obtient l'id de l'utilisateur en fonction du token

    jwt.verify(token, secretKey, (error, decoded) => {
        // on verifie que le token est bien valide
        if (error) {
            console.log(error)
        }

        // on extrait l'id du token
        const id = decoded.id

        db.query("update utilisateurs set utilisateurs_nom = ?, utilisateurs_prenom = ?, utilisateurs_mot_de_passe = ?, utilisateurs_numero_de_telephone = ? WHERE utilisateurs_id = ?", [utilisateurs_nom, utilisateurs_prenom, utilisateurs_adresse_email, utilisateurs_numero_de_telephone, id], (error, result) => {
            if (error) {
                console.log(error)
            } else {
                const newToken = jwt.sign({id: id}, secretKey, {expiresIn: '1h' })
                return response.json({ message: 'Mot de passe mis à jour avec succès', token: newToken })
            }
        })
    })  
})

// route pour récupérer les informations de l'utilisateur en fonction du token
app.get('/utilisateurs/profil', (request, response) => {
    const token = request.headers['authorization'].split(' ')[1]

    if (!token) {
        return response.json({message: 'Token Manquant'})
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return response.json({message: 'Token invalide'})
        }

        const userID = decoded.id

        db.query('select * from utilisateurs WHERE utilisateurs_id = ?', userID, (error, result) => {
            if (error) {
                return response.json({ message: 'Erreur de base de données' })
            }
            if (result.length === 0) {
                return response.json({ message: 'Utilisateur non trouvé' })
            }

            return response.json(result[0])
        })
    })
})

// route pour recuperer les produits

app.get('/orders', (request, response) => {
    const token = request.headers['authorization'].split(' ')[1]

    if (!token) {
        return response.json({message: 'Token Manquant'})
    }

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return response.json({message: 'Token invalide'})
        }

        const userID = decoded.id

        db.query('SELECT * FROM orders WHERE user_id = ?', [userID], (error, result) => {
            if (error) {
                return response.json({message: 'erreur de base de données'})
            }
            // Renvoyer les résultats
            return response.json(result)
        })
    })
})

// afficher tous les produits

app.get('/produits', (request, response) => {
    db.query('select * from produit', (error, result) => {
        if (error) {
            console.log(error)
        } else {
            response.json(result)
        }
    })
})

// afficher les produits en fonction de son id 

app.get('/produits/:id', (request, response) => {
    const id = request.params.id
    db.query('select * from produit where produit_id = ?', id, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            response.json(result)
        }
    })
})

// afficher les utilisateurs

app.get('/utilisateurs', (request, response) => {
    db.query('select * from utilisateurs', (error, result) => {
        if (error) {
            console.log(error)
        } else {
            response.json(result)
        }
    })
})

// afficher les utilisateurs en fonction de son id

app.get('/utilisateurs/:id', (request, response) => {
    const id = request.params.id
    db.query('select * from utilisateurs where utilisateurs_id = ?', id, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            response.json(result)
        }
    })
})

// creation d'un nouvelle utilisateur

app.post('/utilisateurs/inscription', (request, response) => {
    const {utilisateurs_nom, utilisateurs_prenom, utilisateurs_adresse_email, utilisateurs_mot_de_passe, utilisateurs_numero_de_telephone} = request.body
    const saltRound = 12

    bcrypt.genSalt(saltRound, (error, salt) => {
        if (error) {
            console.log(error)
        }

        bcrypt.hash(utilisateurs_mot_de_passe, salt, (error, hash) => {
            if (error) {
                console.log(error)
            }

            db.query('insert into utilisateurs (utilisateurs_nom, utilisateurs_prenom, utilisateurs_adresse_email, utilisateurs_mot_de_passe, utilisateurs_numero_de_telephone) values (?, ?, ?, ?, ?)', [utilisateurs_nom, utilisateurs_prenom, utilisateurs_adresse_email, hash, utilisateurs_numero_de_telephone], (error, result) => {
                if (error) {
                    console.log(error)
                } else {
                    response.json('values inserted')
                }
            })
        })
    })
})

// connexion utilisateurs

app.post('/utilisateurs/connexion', (request, response) => {
    const { utilisateurs_adresse_email, utilisateurs_mot_de_passe } = request.body

    db.query('select * from utilisateurs where utilisateurs_adresse_email = ?', [utilisateurs_adresse_email], (error, result) => {
        if (error) {
            console.log(error)
            return response.json(error)
        }

        if (result.length === 0) {
            return response.json({message: 'adresse email ou mot de passe incorrect'})
        }

        const user = result[0]

        bcrypt.compare(utilisateurs_mot_de_passe, user.utilisateurs_mot_de_passe, (error, match) => {
            if (error) {
                console.log(error)
                return response.json(error)
            }

            if (!match) {
                return response.json({message: 'Adresse email ou mot de passe incorrect'})
            }
            
            const token = jwt.sign({id: user.utilisateurs_id}, secretKey, {expiresIn: '1h' })

            console.log('Generated Token:', token)
            return response.json({ token })
        })
    })
})

// reinitialisation du mot de passe avec le token

app.put('/utilisateurs/newpassword', (request, response) => {
    const token = request.headers['authorization'].split(' ')[1] // recuperation du token
    /*
        en detail:

        request.headers['authorization'] --> on recupere le token via authorization
        c'est ici que l'on stocke le JWT
        cette ligne accede a "Bearer <token>"

        premiere partie: c'est le type d'authentification
        seconde partie: c'est le token jwt
    
        .split(' ') --> on divise la chaine de caractere en tableau
        
        [1] --> on accde au deuxieme element du tableau resulat de split, donc le token
    */
    
    const {oldPassword, newPassword} = request.body // recuperer l'ancien et le nouveau mot de passe dans le corps de la requete
    const saltRound = 12

    // on verifie la presence du token dans le header
    if(!token) {
        return response.json({message: 'aucun token'})
    }

    // on obtient l'id de l'utilisateur en fonction du token

    jwt.verify(token, secretKey, (error, decoded) => {
        // on verifie que le token est bien valide
        if (error) {
            console.log('un probleme est survenue: ', error)
        }

        // on extrait l'id du token
        const id = decoded.id 

        // recherche l'utilisateur en fonction de son id
        db.query('select * from utilisateurs where utilisateurs_id = ?', id,(error, result) => {
            if (error) {
                console.log(error)
            }

            if (result.length === 0) {
                return response.json({message: 'utilisateur inconnu'})
            }

            // on stocke le premiere resultat donc l'utilisateur dans une variable
            const user = result[0]

            // verifier l'ancien de mot de passe avec celui de la db
            bcrypt.compare(oldPassword, user.utilisateurs_mot_de_passe, (error, match) => {
                if (error) {
                    console.log(error)
                }

                if (!match) {
                    return response.json({message: 'ancien mot de passe ne correspond pas'})
                }

                // hacher le mot de passe et inserer le nouveau mot de passe dans la db
                bcrypt.hash(newPassword, saltRound, (error, newHash) => {
                    if (error) {
                        console.log('un probleme est survenue: ', error)
                    }

                    db.query('update utilisateurs set utilisateurs_mot_de_passe = ? where utilisateurs_id = ?', [newHash, id], (error, result) => {
                        if (error) {
                            console.log(error)
                        } else {
                            const newToken = jwt.sign({id: user.utilisateurs_id}, secretKey, {expiresIn: '1h' })
                            return response.json({ message: 'Mot de passe mis à jour avec succès', token: newToken })
                        }
                    })
                })
            })
        })
    })
})

// afficher les adresses postals

app.get('/adresse', (request, response) => {
    db.query('select * from adresses_postales', (error, result) => {
        if (error) {
            console.log(error)
        } else { 
            response.json(result)
        }
    })
})

// afficher les adresses postals en fonction de son id

app.get('/adresse/:id', (request, response) => {
    const id = request.params.id
    db.query('select * from adresses_postales where adresses_postales_id = ?', id, (error, result) => {
        if (error) {
            console.log(error)
        } else {
            response.json(result)
        }
    })
})

// connexion a l'api

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})