import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/*
    ajout formulaire de connexion
    ou ajout voir si le profil est connecte avant le paiement
    pour redirection stripe host heberger
*/

const Panier = () => {
    const [panier, setPanier] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            setPanier(JSON.parse(cart))
        }
    }, [])

    const passerCommande = () => {
        navigate('/paiement')
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
        return panier.reduce((total, item) => total + item.prix * item.quantite, 0)
    }

    const token = localStorage.getItem('token')

    return (
        <div className="p-[24px]">
            <h1 className="font-bold font-[roboto] text-[32px] mb-[24px]">Mon panier</h1>

            {panier.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <>
                    <div>
                        <form>
                            {panier.map(item => 
                                <div key={item.id} className="flex justify-between items-center border p-[16px]">
                                    <p>{item.nom}</p>
                                    <p>{item.prix}€</p>

                                    <button type="button" className="bg-gray-300 text-black py-[6px] px-[12px]" onClick={() => diminuerArticle(item.id)}>-</button>
                                    <p>{item.quantite}</p>
                                    <button type="button" className="bg-gray-300 text-black py-[6px] px-[12px]" onClick={() => augmenterArticle(item.id, item.stock)}>+</button>

                                    <p>{item.quantiteGramme}</p>
                                    <button type="button" className="bg-red-400 text-white py-[12px] px-[16px]" onClick={() => supprimerArticle(item.id)}>Supprimer</button>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="mt-[20px]">
                        <div className="flex">
                            <p>Cout total : {calculerPrixTotal()}€</p>
                        </div>
                    </div>
                    
                    {/* debut de verification du token */}

                    {token ? (
                        <>
                            <button onClick={redirectPage} className="bg-green-principale text-white py-[12px] px-[16px]  mr-[20px]">Retourner vers les courses</button>
                            <button onClick={passerCommande} type="submit" className="bg-green-principale text-white py-[12px] px-[16px] mt-[10px]">Passer Commande</button>
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

                    {/* fin de verification du token */}
                </>
            )} 
        </div>
    )
}

export default Panier