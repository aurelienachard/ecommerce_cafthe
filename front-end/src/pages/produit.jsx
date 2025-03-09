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
    }, [produit_id])

    const handleQuantiteGramme = (event) => {
        setQuantiteGramme(event.target.value)
    }

    const handleQuantite = (event) => {
        setQuantite(event.target.value)
    }

    // on declare une fonction pour calculer la taxe en se basant sur la categorie du produit
    const calculeTax = (produit) => {
        // on initialise la valeur de la variable a 0
        let taxRate = 0
        // si le produit est egale a cafe ou the on definit la attribue la valeur de la taxe a 5.5%
        if (produit.produit_categorie === 'cafe' || produit.produit_categorie === 'the') {
            taxRate = 0.055
        // sinon on attribue une taxe de 20%
        } else if (produit.produit_categorie === 'accessoires') {
            taxRate = 0.20
        }
        // on return la fonction en faisant le calcul
        return produit.produit_prix * (1 + taxRate)
    }

    const ajouterProduit = (produit) => {
        // il permet de recuperer les objets stocker 
        const cart = JSON.parse(localStorage.getItem('cart')) || [] // recuperer le panier et si il est vide initialiser un tableau vide

        // verifie si le produit est un cafe ou un the
        const isCafeOrThe = produit.produit_categorie === 'cafe' || produit.produit_categorie === 'the'

        // chercher si le produit existe ou pas et verifier la quantite en gramme
        const produitExisting = isCafeOrThe 
            ? cart.find(item => item.id === produit.produit_id && item.quantiteGramme === quantiteGramme)
            : cart.find(item => item.id === produit.produit_id)

        if (produitExisting) {
            // si le produit existe on met a jour la quanite
            produitExisting.quantite += quantite
        } else {
            // sinon ajoute le produit dans le panier
            const taxPrixTTC = calculeTax(produit)

            const newCart = {
                id: produit.produit_id,
                nom: produit.produit_nom,
                quantite: quantite,
                prix: produit.produit_prix,
                prixTTC: taxPrixTTC // on ajoute aussi prix ttc
            }

            if (isCafeOrThe) {
                newCart.quantiteGramme = quantiteGramme
            }

            cart.push(newCart)
        }
        localStorage.setItem('cart', JSON.stringify(cart)) // on met a jour le panier
    }

    return (
        <div className="bg-white">
            <div className="max-w-[1280px] mx-auto py-[48px] px-[16px] sm:px-[24px] lg:px-[32px]">
                <div className="pt-[24px] pb-[64px] sm:pb-[96px]">
                    {data.map((produit) => (
                    <div key={produit.produit_id} className="flex flex-col lg:flex-row lg:gap-x-8">
                        <div className="flex-1 lg:max-w-[50%]">
                            <div className="aspect-square w-full overflow-hidden rounded-lg">
                                <img
                                    src="../image.jpg"
                                    alt="ceci est une image" 
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="flex-1 mt-[32px] lg:mt-0">
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-[24px] font-medium text-gray-900">{produit.produit_nom}</h1>
                                    <p className="text-[24px] font-medium text-gray-900">{produit.produit_prix}€</p>
                                </div>
                            
                                <div className="mt-[20px]">
                                    <h2 className="text-[16px] font-medium text-gray-900">Quantité</h2>
                                    <input
                                        type="number"
                                        value={quantite}
                                        min="1"
                                        max={produit.produit_quantite}
                                        onChange={handleQuantite}
                                        className="mt-[10px] w-[80px] border border-gray-200 py-[12px] px-[16px] text-[16px] font-medium text-gray-900 focus:border-emerald-600 focus:outline-none rounded-md"
                                    />
                                </div>

                                {produit.produit_categorie === 'cafe' || produit.produit_categorie === 'the' ? (
                                    <div className="mt-[20px]">
                                        <h2 className="text-[16px] font-medium text-gray-900">Grammes</h2>
                                        <div className="flex mt-[10px] gap-3">
                                            <label className={`${quantiteGramme === '100g'
                                                ? 'border-transparent bg-emerald-600 text-white hover:bg-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                                            } border flex-1 cursor-pointer flex items-center justify-center rounded-md py-[12px] px-[16px] text-[16px] font-medium uppercase focus:outline-none`}>
                                                <input
                                                    type="radio"
                                                    value="100g"
                                                    checked={quantiteGramme === '100g'}
                                                    onChange={handleQuantiteGramme}
                                                    className="sr-only"
                                                />
                                                100g
                                            </label>

                                            <label className={`${quantiteGramme === '200g'
                                                ? 'border-transparent bg-emerald-600 text-white hover:bg-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                                            } border flex-1 cursor-pointer flex items-center justify-center rounded-md py-[12px] px-[16px] text-[16px] font-medium uppercase focus:outline-none`}>
                                                <input
                                                    type="radio"
                                                    value="200g"
                                                    checked={quantiteGramme === '200g'}
                                                    onChange={handleQuantiteGramme}
                                                    className="sr-only"
                                                />
                                                200g
                                            </label>

                                            <label className={`${quantiteGramme === '300g'
                                                ? 'border-transparent bg-emerald-600 text-white hover:bg-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50'
                                            } border flex-1 cursor-pointer flex items-center justify-center rounded-md py-[12px] px-[16px] text-[16px] font-medium uppercase focus:outline-none`}>
                                                <input
                                                    type="radio"
                                                    value="300g"
                                                    checked={quantiteGramme === '300g'}
                                                    onChange={handleQuantiteGramme}
                                                    className="sr-only"
                                                />
                                                300g
                                            </label>
                                        </div>
                                    </div>
                                ) : null}

                                <button 
                                    onClick={() => ajouterProduit(produit)}
                                    className="mt-[32px] flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-600 px-[32px] py-[12px] text-base font-medium text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-hidden"
                                >
                                    Ajouter au panier
                                </button>

                                <div className="my-[32px] h-[1px] bg-gray-200"></div>

                                <div className="mt-[20px]">
                                    <h2 className="text-[16px] font-medium text-gray-900">Description</h2>
                                    <p className="mt-[16px] space-y-4 text-[16px] text-gray-500">{produit.produit_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div> 
        </div>
    )
}

export default Produit