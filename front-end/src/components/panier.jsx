import { useEffect, useState } from "react"

const Panier = () => {
    const [panier, setPanier] = useState([])
    
    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart) {
            setPanier(JSON.parse(cart))
        }
    }, [])

    const supprimerArticle = (id) => {
        // on creer un nouveau tableau sans l'objet a supprimer
        const updatedPanier = panier.filter(item => item.id !== id)
        // on met a jour le panier avec la variable ci-dessus
        setPanier(updatedPanier)
        // on met a jour le panier
        localStorage.setItem("cart", JSON.stringify(updatedPanier))
    }

    const calculerPrixTotal = () => {
        return panier.reduce((total, item) => total + item.prix * item.quantite, 0)
    }

    return (
        <div className="flex flex-col p-[24px]">
            <h1 className="text-[32px] font-bold p-[16px]">Panier</h1>
            <form>
                {panier.map(item => 
                    <div className="border flex items-center p-[16px] justify-between mb-[20px]">
                        <p className="max-w-64 w-[300px]">{item.nom}</p>
                        <p>{item.prix}€</p>
                        <p>{item.quantite}</p>
                        <p>{item.quantiteGramme}</p>
                        <button type="button" className="bg-red-700 text-white p-[16px]" onClick={() => supprimerArticle(item.id)}>Supprimer</button>
                    </div>
                )}
            </form>

            <h2 className="p-[16px] font-bold text-[24px]">Total : {calculerPrixTotal()}€</h2>
            <button type="submit" className="bg-green-950 text-white p-[16px] mt-[24px]">Passer Commande</button>
        </div>
    )
}

export default Panier