import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Panier = () => {
    const [panier, setPanier] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            setPanier(JSON.parse(cart))
        }
    }, [])

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

    const calculerPrixTotal = () => {
        return panier.reduce((total, item) => total + item.prix * item.quantite, 0)
    }

    return (
        <div className="p-[24px]">
            <h1 className="font-bold font-[roboto] text-[32px] mb-[24px]">Mon panier</h1>
                <div className="p-[24px]">
                    <form>
                        {panier.map(item => 
                            <div key={item.id} className="flex justify-between items-center">
                                <p>{item.nom}</p>
                                <p>{item.prix}€</p>
                                <p>{item.quantite}</p>
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

                    <button onClick={redirectPage} className="bg-green-principale text-white py-[12px] px-[16px]  mr-[20px]">Retourner vers les courses</button>
                    <button type="submit" className="bg-green-principale text-white py-[12px] px-[16px] mt-[10px]">Passer Commande</button>
                </div>
        </div>
    )
}

export default Panier