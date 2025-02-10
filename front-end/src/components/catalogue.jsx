import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Catalogue = () => {
    const [data, setData] = useState([]) // composants pour stocker et afficher les produits
    const [search, setSearch] = useState('') // composants pour rechercher le produit
    const [selectCategory, setSelectCatagory] = useState('') // composants pour filtrer les produits

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

    const filteredProducts = data.filter((produit) => 
        produit.produit_nom.toLowerCase().includes(search.toLowerCase()) && (selectCategory === '' || produit.produit_categorie === selectCategory)
        /*
            on verifie le nom du produit
            on verifie la categorie du produit
        */
    )

    const handleCategory = (category) => {
        // met a jour l'etat de selectCategory en fonction du bouton clique et du parametre category
        setSelectCatagory(category)
    }

    return (
        <div className="flex flex-col items-center p-[24px]">
            <h1 className="font-sans text-[32px] font-bold mb-[20px]">Catalogue</h1>

            <div>
                <input className="border py-[12px] px-[16px] w-150" placeholder="Recherchez un produit" onChange={handleSearch}/>
            </div>

            <div className="flex items-center">
                <p>Filtre produit:</p>
                <button className="border mt-[20px] py-[12px] px-[16px] m-[16px] bg-gray-200" onClick={() => handleCategory('')}>All</button>
                <button className="border mt-[20px] py-[12px] px-[16px] m-[16px] bg-gray-200" onClick={() => handleCategory('cafe')}>Cafe</button>
                <button className="border mt-[20px] py-[12px] px-[16px] m-[16px] bg-gray-200" onClick={() => handleCategory('the')}>The</button>
                <button className="border mt-[20px] py-[12px] px-[16px] m-[16px] bg-gray-200" onClick={() => handleCategory('accessoires')}>Accessoires</button>                
            </div>

            <div className="flex flex-wrap justify-center text-center">
                {filteredProducts.map((produit) =>
                    <div className="bg-gray-200 m-[20px] p-[20px] w-[250px]" key={produit.produit_id}>
                        <p className="p-[10px] my-[10px] font-bold text-[24px]">{produit.produit_nom}</p>
                        <p className="p-[10px] my-[10px]">{produit.produit_prix}€</p>

                        <Link to={`/produits/${produit.produit_id}`}>
                            <button className="bg-green-950 text-white p-[16px]" type="button">Voir le produit</button>
                        </Link>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Catalogue