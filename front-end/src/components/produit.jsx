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
        <div className="flex flex-col p-[24px]">
            {data.map((produit) => (
                <div key={produit.produit_id}>
                    <h1 className="p-[16px] border text-[32px] font-bold w-150">{produit.produit_nom}</h1>
                    <p className="p-[16px] border flex mt-[20px] w-150 pt-[16px]">Stock : {produit.produit_quantite}</p>
                    <p className="p-[16px] border mt-[20px] w-150 pt-[16px]">Prix : {produit.produit_prix}</p>
                    <p className="p-[16px] border mt-[20px] w-150 pt-[16px]">Description : {produit.produit_description}</p>

                    {produit.produit_categorie === 'cafe' || produit.produit_categorie === 'the' ? (
                        <div className="p-[16px] flex flex-col w-150 border mt-[20px]">

                            <p className="pb-[20px]">Choisir le nombre de grammes :</p>

                            <label>
                                <input type="radio" value="100g" checked={quantiteGramme === '100g'} onChange={handleQuantiteGramme}/> 100g
                            </label>

                            <label>
                                <input className="p-[16px] mt-[20px]" type="radio" value="200g" checked={quantiteGramme === '200g'} onChange={handleQuantiteGramme}/> 200g
                            </label>

                            <label>
                                <input className=" p-[16px] mt-[20px]" type="radio" value="300g" checked={quantiteGramme === '300g'} onChange={handleQuantiteGramme}/> 300g
                            </label>
                        </div>
                    ) : null}

                    <div className="border mt-[20px] p-[16px] w-150">
                        Choisir la quantite : <input className="border p-[16px]" type="number" value={quantite} min="1" max={produit.produit_quantite} onChange={handleQuantite}/>
                    </div>

                    <button className="border bg-green-950 mt-[20px] text-white p-[16px]" onClick={() => ajouterProduit(produit)}>Ajouter au panier</button>
                </div>
            ))}
        </div>
    )
}

export default Produit