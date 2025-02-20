import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Catalogue = () => {
    const [data, setData] = useState([]) // composants pour stocker et afficher les produits
    const [search, setSearch] = useState('') // composants pour rechercher le produit
    const [selectCategory, setSelectCatagory] = useState('') // composants pour filtrer les produits
    const [activeBouton, setActiveBouton] = useState('')

    // afficher la liaison entre le serveur et l'api
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
        // met a jour l'etat de selectCategory en fonction du bouton clique et du parametre category
        setSelectCatagory(category)
        setActiveBouton(category)
    }

    const filteredProducts = data.filter((produit) => 
        produit.produit_nom.toLowerCase().includes(search.toLowerCase()) && (selectCategory === '' || produit.produit_categorie === selectCategory)
        /*
            on verifie le nom du produit
            on verifie la categorie du produit
        */
    )

    return (
        <div className="min-h-screen flex flex-col items-center p-[24px]">
            <h1 className="font-sans text-[32px] font-bold mb-[20px]">Catalogue</h1>

            <div>
                <input className="border py-[12px] px-[16px] w-150 rounded-md" placeholder="Rechercher un produit" onChange={handleSearch}/>
            </div>

            <div className="flex flex-row justify-center mt-[20px] w-full">
                <div className="flex flex-col mr-8">
                    <p className="text-[18px] font-bold mb-[20px]">Filtre produit:</p>
                    <button className={`text-left border rounded-md mb-[20px] py-[12px] px-[16px] ${activeBouton === '' ? 'bg-green-principale text-white' : 'bg-gray-200 hover:bg-green-principale hover:text-white'}`} onClick={() => handleCategory('')}>All</button>
                    <button className={`text-left border rounded-md mb-[20px] py-[12px] px-[16px] ${activeBouton === 'cafe' ? 'bg-green-principale text-white' : 'bg-gray-200 hover:bg-green-principale hover:text-white'}`} onClick={() => handleCategory('cafe')}>Cafe</button>
                    <button className={`text-left border rounded-md mb-[20px] py-[12px] px-[16px] ${activeBouton === 'the' ? 'bg-green-principale text-white' : 'bg-gray-200 hover:bg-green-principale hover:text-white'}`} onClick={() => handleCategory('the')}>The</button>
                    <button className={`text-left border rounded-md mb-[20px] py-[12px] px-[16px] ${activeBouton === 'accessoires' ? 'bg-green-principale text-white' : 'bg-gray-200 hover:bg-green-principale hover:text-white'}`} onClick={() => handleCategory('accessoires')}>Accessoires</button>                
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {filteredProducts.map((produit) =>
                        <div className="shadow-md bg-neutral rounded-md m-[24px] w-[300px]" key={produit.produit_id}>
                            <img src="./image.jpg" alt="photo" className="h-[256px] w-full object-cover"/>
                            <p className="font-[Roboto] font-bold text-[18px] mt-[24px] ml-[24px]">{produit.produit_nom}</p>

                            <div className="flex ml-[24px] mr-[24px] mt-[20px] mb-[24px] items-center">
                                <p className="mr-[24px] ">Prix: ${produit.produit_prix}</p>

                                <Link to={`/produits/${produit.produit_id}`}>
                                    <button className="bg-green-principale py-[12px] px-[16px] rounded-md text-white" type="button">Voir le produit</button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Catalogue