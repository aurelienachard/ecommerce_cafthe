import { Link } from "react-router-dom"

const Produit = ({ produits }) => {
    return (
        <div className="flex flex-wrap gap-x-6 gap-y-10 w-full">
            {produits.map((produit) => (
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
    )
}

export default Produit 