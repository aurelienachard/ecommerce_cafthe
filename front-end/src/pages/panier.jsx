import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import CartItems from '../components/CartItems'

const Panier = () => {
    const [panier, setPanier] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            setPanier(JSON.parse(cart))
        }
    }, [])

    const handleOnlinePayment = (event) => {
        event.preventDefault()

        const cart = panier // on recupere les donnees du panier et on stocke dans une variable
        const token = localStorage.getItem('token')

        axios.post(`${import.meta.env.VITE_DOMAIN_API}/create-checkout-session`, {cart}, {
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

    const handleStorePayment = (event) => {
        event.preventDefault()
        const cart = panier
        const token = localStorage.getItem('token')

        axios.post(`${import.meta.env.VITE_DOMAIN_API}/create-store-order`, {cart}, {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            navigate('/successStore')
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const supprimerArticle = (id, quantiteGramme) => {
        // on creer un nouveau tableau sans l'objet supprimer
        const updatedPanier = panier.filter(item => !(item.id === id && item.quantiteGramme === quantiteGramme))
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

    const augmenterArticle = (id, quantiteGramme) => {
        const updatedPanier = panier.map(item => {
            if (item.id === id && item.quantiteGramme === quantiteGramme) {
                item.quantite += 1
            }
            return item
        })
        setPanier(updatedPanier)
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const diminuerArticle = (id, quantiteGramme) => {
        const updatedPanier = panier.map(item => {
            if (item.id === id && item.quantiteGramme === quantiteGramme && item.quantite > 1) {
                item.quantite -= 1
            }
            return item
        })
        setPanier(updatedPanier)
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const calculerPrixTotalHT = () => {
        return panier.reduce((total, item) => total + item.prix * item.quantite, 0).toFixed(2)
    }

    const calculerPrixTotalTTC = () => {
        return panier.reduce((total, item) => total + item.prixTTC * item.quantite, 0).toFixed(2)
    }

    const token = localStorage.getItem('token')

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-[672px] px-[16px] pt-[64px] pb-[96px] sm:px-[24px] lg:max-w-[1280px] lg:px-[32px]">   
                <h1 className="text-[32px] font-bold text-gray-900 sm:text-4xl">Mon panier</h1>

                <div>
                    {panier.length === 0 ? (
                        <div className="mt-[24px] text-center">
                            <p className="text-gray-500">Le panier est vide</p>
                        </div>
                        ) : (
                            <form className="mt-12">
                                <div className="flex flex-col lg:flex-row lg:gap-x-12 xl:gap-x-16">
                                    <CartItems 
                                        panier={panier}
                                        augmenterArticle={augmenterArticle}
                                        diminuerArticle={diminuerArticle}
                                        supprimerArticle={supprimerArticle}
                                    />

                                    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:w-96">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Récapitulatif de la commande
                                        </h2>

                                        <dl className="mt-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-sm text-gray-600">Total HT</dt>
                                                <dd className="text-sm font-medium text-gray-900">{calculerPrixTotalHT()}€</dd>
                                            </div>
                                            
                                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                                <dt className="text-base font-medium text-gray-900">Cout total TTC</dt>
                                                <dd className="text-base font-medium text-gray-900">{calculerPrixTotalTTC()}€</dd>
                                            </div>
                                            
                                            {token ? (
                                                <div className="mt-6 space-y-4">
                                                        <button 
                                                            type="submit" 
                                                            onClick={handleOnlinePayment}
                                                            className="w-full rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                                                Payer en ligne
                                                        </button>

                                                        <button 
                                                            type="submit" 
                                                            onClick={handleStorePayment}
                                                            className="w-full rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                                                Payer en magasin
                                                        </button>

                                                        <button 
                                                            onClick={redirectPage}
                                                            className="w-full text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                                                Retourner vers les courses
                                                        </button>
                                                </div>
                                            ) : (
                                                <div className="mt-6 space-y-4">
                                                    <div className="rounded-md bg-yellow-50 p-4">
                                                        <h2 className="text-sm font-medium text-yellow-800">Tu dois te connecter pour passer ta commande</h2>
                                                        <p className="mt-2 text-sm text-yellow-700">Connecte toi via ce bouton</p>
                                                    </div>

                                                    <button
                                                        onClick={redirectConnexion}
                                                        className="w-full rounded-md border border-transparent bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                                                        Se connecter
                                                    </button>
                                                    <button
                                                        onClick={redirectPage}
                                                        className="w-full text-sm font-medium text-emerald-600 hover:text-emerald-500">
                                                        Retourner vers les courses
                                                    </button>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </form>
                        )}
                </div>
            </div>
           
        </div>
    )
}

export default Panier