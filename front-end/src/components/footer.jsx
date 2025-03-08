import { Link } from "react-router-dom"

const Footer = () => {
    return ( 
        <footer className="bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
                {/* En-tête du footer */}
                <div className="flex flex-col xl:flex-row xl:gap-8">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[24px] font-bold text-white">CAFTHE</h2>
                        <p className="text-sm/6 text-balance text-gray-300">
                            Votre entreprise qui est spécialisée dans la vente de thés et de cafés haut de gamme, provenant des 4 coins du monde.
                        </p>
                    </div>

                    {/* Section principale */}
                    <div className="mt-16 flex-[2] xl:mt-0">
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            {/* Coordonnées */}
                            <div className="flex-1">
                                <h3 className="text-sm/6 font-semibold text-white">COORDONNÉES</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-sm/6 text-gray-400">69 Rue du Commerce, 41000 Blois</li>
                                    <li className="text-sm/6 text-gray-400">+33 02 42 42 42 42</li>
                                    <li className="text-sm/6 text-gray-400">contact@cafthe.fr</li>
                                </ul>
                            </div>

                            {/* Pages */}
                            <div className="flex-1">
                                <h3 className="text-sm/6 font-semibold text-white">PAGES</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link className="text-sm/6 text-gray-400 hover:text-white" to="#">Produits</Link>
                                    </li>
                                    <li>
                                        <Link className="text-sm/6 text-gray-400 hover:text-white" to="#">Accessoires</Link>
                                    </li>
                                    <li>
                                        <Link className="text-sm/6 text-gray-400 hover:text-white" to="#">Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm/6 text-gray-400">&copy; 2025 Cafthe. Tous droits réservés.</p>
                        <div className="flex items-center space-x-4 text-sm/6 text-gray-400">
                            <Link className="hover:text-white" to="/CGU">Conditions Générales Utilisation</Link>
                            <span className="text-gray-500">|</span>
                            <Link className="hover:text-white" to="/CGV">Conditions Générales de Vente</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
