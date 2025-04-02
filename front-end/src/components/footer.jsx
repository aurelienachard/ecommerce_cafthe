import { Link } from "react-router-dom"

const Footer = () => {
    return ( 
        <footer className="bg-emerald-900">
            <div className="mx-auto max-w-7xl px-[24px] pt-[64px] pb-[32px] sm:pt-[96px] lg:px-[32px] lg:pt-[128px]">
                {/* En-tête du footer */}
                <div className="flex flex-col xl:flex-row xl:gap-[64px]">
                    <div className="flex-1 space-y-8">
                        <h2 className="text-[24px] font-bold text-white">CAFTHE</h2>
                        <p className="text-base text-gray-200">
                            Votre entreprise qui est spécialisée dans la vente de thés et de cafés haut de gamme, provenant des 4 coins du monde.
                        </p>
                    </div>

                    {/* Section principale */}
                    <div className="mt-16 flex-[2] xl:mt-0">
                        <div className="flex flex-col md:flex-row justify-between gap-8">
                            {/* Coordonnées */}
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold text-white">COORDONNÉES</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li className="text-[16px] text-gray-200">69 Rue du Commerce, 41000 Blois</li>
                                    <li className="text-[16px] text-gray-200">+33 02 42 42 42 42</li>
                                    <li className="text-[16px] text-gray-200">contact@cafthe.fr</li>
                                </ul>
                            </div>

                            {/* Pages */}
                            <div className="flex-1">
                                <h3 className="text-[18px] font-semibold text-white">PAGES</h3>
                                <ul role="list" className="mt-[24px] space-y-4">
                                    <li>
                                        <Link className="text-[16px] text-gray-200 hover:text-white" to="#">Produits</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[16px] text-gray-200 hover:text-white" to="#">Accessoires</Link>
                                    </li>
                                    <li>
                                        <Link className="text-[16px] text-gray-200 hover:text-white" to="#">Blog</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pied de page */}
                <div className="mt-16 border-t border-white/10 pt-[32px] sm:mt-[80px] lg:mt-[96px]">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-[16px] text-gray-200">&copy; 2025 Cafthe. Tous droits réservés.</p>
                        <div className="flex items-center space-x-4 text-[16px] text-gray-200">
                            <Link className="hover:text-white" to="/RGPD">Politique de confidentialité</Link>
                            <span className="text-gray-200">|</span>
                            <Link className="hover:text-white" to="/CGU">Conditions Générales Utilisation</Link>
                            <span className="text-gray-200">|</span>
                            <Link className="hover:text-white" to="/CGV">Conditions Générales de Vente</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
