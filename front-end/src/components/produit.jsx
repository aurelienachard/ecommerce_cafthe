import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const Produit = () => {
   const [data, setData] = useState([])
   const [quantite, setQuantite] = useState(1)
   const [quantiteGramme, setQuantiteGramme] = useState('100g')
   const {produit_id} = useParams()
   
    useEffect(() => {
        axios.get(`http://localhost:3001/produits/${produit_id}`)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleQuantiteGramme = (event) => {
        setQuantiteGramme(event.target.value)
    }

    const handleQuantite = (event) => {
        setQuantite(event.target.value)
    }

    const ajouterProduit = (produit) => {
        // il permet de recuperer les objets stocker 
        const cart = JSON.parse(localStorage.getItem('cart')) || [] // recuperer le panier et si il est vide initialiser un tableau vide

        // chercher si le produit existe ou pas et verifier la quantite en gramme
        const produitExisting = cart.find(item => item.id === produit.produit_id && item.quantiteGramme === quantiteGramme) 

        if (produitExisting) {
            // si le produit existe on met a jour la quanite
            produitExisting.quantite += quantite
        } else {
            // sinon ajoute le produit dans le panier
            cart.push({
                id: produit.produit_id,
                nom: produit.produit_nom,
                quantite: quantite,
                quantiteGramme: quantiteGramme,
                prix: produit.produit_prix
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart)) // on met a jour le panier
    }

    return (
        <div className="min-h-screen p-[24px]">
            {data.map((produit) => (
                <div key={produit.produit_id}>
                    <h1 className="font-bold font-[Roboto] text-[24px] mb-[20px]">{produit.produit_nom}</h1>
                    <p className="border pl-[12px] py-[12px] mb-[20px]">Stock : {produit.produit_quantite}</p>
                    <p className="border pl-[12px] py-[12px] mb-[20px]">Prix : {produit.produit_prix}$</p>
                    <p className="border pl-[12px] py-[12px] mb-[20px]">Description : {produit.produit_description}</p>

                    {produit.produit_categorie === 'cafe' || produit.produit_categorie === 'the' ? (
                        <div className="mb-[20px]">
                            <p className="mb-[20px] font-bold">Choisir le nombre de grammes :</p>
                            <div className="flex flex-col">
                                <label className="border py-[12px] mb-[20px]">
                                    <input type="radio" className="ml-[12px]" value="100g" checked={quantiteGramme === '100g'} onChange={handleQuantiteGramme}/> 100g
                                </label>

                                <label className="border py-[12px] mb-[20px]">
                                    <input type="radio" className="ml-[12px]" value="200g" checked={quantiteGramme === '200g'} onChange={handleQuantiteGramme}/> 200g
                                </label>

                                <label className="border py-[12px]">
                                    <input type="radio" className="ml-[12px]" value="300g" checked={quantiteGramme === '300g'} onChange={handleQuantiteGramme}/> 300g
                                </label>
                            </div>
                        </div>
                    ) : null}

                    <div>
                        <p className="font-bold mb-[20px]">Choisir la quantite : </p>
                        <input className="border" type="number" value={quantite} min="1" max={produit.produit_quantite} onChange={handleQuantite}/>
                    </div>

                    <button className="font-[Inter] bg-green-principale text-white py-[12px] px-[16px] mt-[10px]" onClick={() => ajouterProduit(produit)}>Ajouter au panier</button>
                </div>
            ))}
        </div>
    )
}

export default Produit