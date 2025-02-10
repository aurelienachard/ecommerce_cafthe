const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const secretKey = process.env.SECRET_KEY

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

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

    // ajout aleatoire de donnees a un mot de passe
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

// reinitialisation du mot de passe

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
                            response.json('mise a jour reussi')
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