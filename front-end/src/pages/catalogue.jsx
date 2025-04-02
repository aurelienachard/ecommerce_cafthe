import { useEffect, useState } from "react"
import axios from 'axios'
import Recherche from '../components/recherche'
import Filtre from '../components/Filtre'
import Produit from '../components/produit'

const Catalogue = () => {
    const [data, setData] = useState([]) // variable pour stocker et afficher les produits
    const [search, setSearch] = useState('') // variable pour rechercher le produit
    const [selectCategory, setSelectCatagory] = useState('') // variable pour filtrer les produits
    const [activeBouton, setActiveBouton] = useState('') // variable pour le bouton filtre

    // liaison entre le serveur et l'api
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_DOMAIN_API}/produits`)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

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

                {/* On defini le composant barre de recherche, on fait passer la variable setsearch dans le props */}
                <Recherche search={setSearch} />

                <div className="pt-[32px] flex flex-col lg:flex-row gap-[32px]">
                    {/* On defini le composant pour le filtre, on fait passer la variable handleCategory et activeBoutondans les props */}
                    <Filtre handleCategory={handleCategory} activeBouton={activeBouton} />

                    <div className="flex-1">
                        {/* On defini le composant produit, on fait passer la fonction filteredProduits dans le props */}
                        <Produit produits={filteredProducts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalogue