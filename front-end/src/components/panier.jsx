import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Panier = () => {
    const [panier, setPanier] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            setPanier(JSON.parse(cart))
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const cart = panier // on recupere les donnees du panier et on stocke dans une variable
        const token = localStorage.getItem('token')

        axios.post('http://localhost:3001/create-checkout-session', {cart}, {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}` // ajout du token dans le header
            }
        })
        .then((response) => {
            // on redirige vers la page stripe
            if (response.data.url) { // si on a une reponse, on redirige vers cette url
                // obtenir l'adresse de la page actuelle (URL) et pour rediriger le navigateur vers une nouvelle page
                window.location.href = response.data.url;
            }
        })
        .catch((error) => {
            console.log("URL de redirection non trouvée dans la réponse", error)
        })
    }

    const supprimerArticle = (id) => {
        // on creer un nouveau tableau sans l'objet supprimer
        const updatedPanier = panier.filter(item => item.id !== id)
        // on met a jour le panier avec la variable ci-dessus
        setPanier(updatedPanier)
        // on met a jour le panier
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const redirectPage = () => {
        navigate('/produits')
    }

    const redirectConnexion = () => {
        navigate('/connexion')
    }

    const augmenterArticle = (id) => {
        const updatedPanier = panier.map(item => {
            if (item.id === id) {
                item.quantite += 1
            }
            return item
        })
        setPanier(updatedPanier)
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const diminuerArticle = (id) => {
        const updatedPanier = panier.map(item => {
            if (item.id === id && item.quantite > 1) {
                item.quantite -= 1
            }
            return item
        })
        setPanier(updatedPanier)
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const calculerPrixTotal = () => {
        return panier.reduce((total, item) => total + item.prixTTC * item.quantite, 0).toFixed(2)
    }

    const token = localStorage.getItem('token')

    return (
        <div className="min-h-screen p-[24px]">
            <h1 className="font-bold font-[roboto] text-[32px] mb-[24px]">Mon panier</h1>
                <div>
                    {panier.length === 0 ? (
                            <>
                                <p>le panier est vide</p>
                            </>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit}>
                                    {panier.map(item => 
                                        <div key={item.id} className="flex justify-between items-center border p-[16px] mb-[20px]">
                                            <p>{item.nom}</p>
                                            <p>{item.prix}€</p>

                                            <button type="button" className="bg-gray-300 text-black py-[6px] px-[12px]" onClick={() => diminuerArticle(item.id)}>-</button>
                                            <p>{item.quantite}</p>
                                            <button type="button" className="bg-gray-300 text-black py-[6px] px-[12px]" onClick={() => augmenterArticle(item.id)}>+</button>

                                            <p>{item.quantiteGramme}</p>
                                            <button type="button" className="bg-red-400 text-white py-[12px] px-[16px]" onClick={() => supprimerArticle(item.id)}>Supprimer</button>
                                        </div>
                                    )}

                                    <div className="mt-[20px]">
                                        <div className="flex">
                                            <p>Cout total TTC : {calculerPrixTotal()}€</p>
                                        </div>
                                    </div>

                                    {token ? (
                                        <>
                                            <button onClick={redirectPage} className="bg-green-principale text-white py-[12px] px-[16px]  mr-[20px]">Retourner vers les courses</button>
                                            <button type="submit" className="bg-green-principale text-white py-[12px] px-[16px] mt-[10px]">Passer Commande</button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="border p-[10px] mt-[10px] mb-[10px]">
                                                <h2>Tu dois te connecter pour passer commande</h2>
                                                <p>Connecte toi via ce bouton</p>
                                                <button onClick={redirectConnexion} className="border bg-blue-500 py-[12px] px-[16px] mt-[10px] text-white">Se connecter</button>
                                            </div>

                                            <button onClick={redirectPage} className="bg-green-principale text-white py-[12px] px-[16px]  mr-[20px]">Retourner vers les courses</button>
                                        </>
                                    )}
                                </form>
                            </>
                    )}
                </div>
        </div>
    )
}

export default Panier