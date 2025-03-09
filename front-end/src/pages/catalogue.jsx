import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Catalogue = () => {
    const [data, setData] = useState([]) // variable pour stocker et afficher les produits
    const [search, setSearch] = useState('') // variable pour rechercher le produit
    const [selectCategory, setSelectCatagory] = useState('') // variable pour filtrer les produits
    const [activeBouton, setActiveBouton] = useState('') // variable pour le bouton filtre

    // liaison entre le serveur et l'api
    useEffect(() => {
        axios.get("http://localhost:3001/produits")
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    const handleCategory = (category) => {
        /*
        * met a jour l'etat de selectCategory en fonction du
        * bouton clique et du parametre category
        */
        setSelectCatagory(category)
        setActiveBouton(category)
    }

    // fonction de recherche
    const filteredProducts = data.filter((produit) => 
        produit.produit_nom.toLowerCase().includes(search.toLowerCase())
        && (selectCategory === '' || produit.produit_categorie === selectCategory)
        /*
            on verifie le nom du produit
            on verifie la categorie du produit
        */
    )

    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-[672px] px-[16px] py-[32px] sm:px-[24px] lg:max-w-[1280px]">
                <div>
                    <h1 className="text-[36px] font-bold text-gray-900">Produits</h1>
                    <p className="mt-[16px] text-base text-gray-500">Découvrez nos produits au goût exceptionnel !</p>
                </div>

                <div className="border-b border-gray-200 mt-[32px]"></div>

                <input 
                    className="mt-[32px] w-full text-[16px] outline-1 -outline-offset-1 outline-gray-300 block rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]" 
                    placeholder="Rechercher un produit" 
                    onChange={handleSearch}
                />

                <div className="pt-[32px] flex flex-col lg:flex-row gap-[32px]">
                    <div className="w-full lg:w-[256px]">
                        <div className="top-[16px]">
                            <p className="text-[16px] font-medium text-gray-900 pb-[16px]">Filtre</p>

                            <div className="mt-[16px] space-y-4">
                                <button
                                    onClick={() => handleCategory('')}
                                    className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                                        ${activeBouton === '' 
                                        ? 'bg-emerald-700 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>

                                <button
                                    onClick={() => handleCategory('cafe')}
                                    className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                                        ${activeBouton === 'cafe' 
                                        ? 'bg-emerald-700 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Café
                                </button>
                                
                                <button
                                    onClick={() => handleCategory('the')}
                                    className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                                        ${activeBouton === 'the'
                                        ? 'bg-emerald-700 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Thé
                                </button>
                                
                                <button
                                    onClick={() => handleCategory('accessoires')}
                                    className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                                        ${activeBouton === 'accessoires'
                                        ? 'bg-emerald-700 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Accessoires
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap gap-x-6 gap-y-10 w-full">
                            {filteredProducts.map((produit) => (
                                <div key={produit.produit_id} className="group w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                                <Link to={`/produits/${produit.produit_id}`}>
                                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                                            <img
                                                src="./image.jpg"
                                                alt="photo du produit"
                                                className="h-full w-full object-cover object-center group-hover:opacity-50"
                                            />
                                        </div>
                                        
                                        <div className="mt-4">
                                            <h3 className="text-[16px] text-gray-700">{produit.produit_nom}</h3>
                                            <p className="mt-1 text-lg font-medium text-gray-900">{produit.produit_prix}€</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Catalogue