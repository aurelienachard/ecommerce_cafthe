const RGPD = () => {
    return (
        <div className="min-h-screen p-[24px] max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Politique de Protection des Données Personnelles (RGPD)</h1>
            
            <div className="space-y-8">
                {/* Introduction */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <div className="prose">
                        <p>
                            La présente politique de protection des données personnelles a pour objectif d'informer les utilisateurs sur la collecte, l'utilisation et la protection de leurs données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
                        </p>
                    </div>
                </section>

                {/* Responsable du traitement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Responsable du traitement</h2>
                    <div className="prose">
                        <p>
                            Le responsable du traitement des données est Cafthe, situé à 69 Rue du Commerce, 41000 Blois, joignable à{' '}
                            <a href="mailto:contact@cafthe.fr" className="text-blue-600 hover:text-blue-800">
                                contact@cafthe.fr
                            </a>{' '}
                            ou au +33 02 42 42 42 42.
                        </p>
                    </div>
                </section>

                {/* Données collectées */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Données collectées</h2>
                    <div className="prose">
                        <p>Les données personnelles collectées peuvent inclure :</p>
                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail</li>
                            <li>Numéro de téléphone</li>
                            <li>Adresse postale</li>
                            <li>Données bancaires</li>
                        </ul>
                    </div>
                </section>

                {/* Finalités du traitement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Finalités du traitement</h2>
                    <div className="prose">
                        <p>Les données collectées sont utilisées pour :</p>
                        <ul>
                            <li>La gestion des relations clients</li>
                            <li>Le respect des obligations légales et réglementaires</li>
                        </ul>
                    </div>
                </section>

                {/* Base légale du traitement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Base légale du traitement</h2>
                    <div className="prose">
                        <p>Le traitement des données repose sur :</p>
                        <ul>
                            <li>Le consentement explicite de l'utilisateur</li>
                            <li>Le respect d'une obligation légale</li>
                        </ul>
                    </div>
                </section>

                {/* Durée de conservation */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
                    <div className="prose">
                        <p>Les données sont conservées pour une durée de 30 jours avant suppression.</p>
                    </div>
                </section>

                {/* Droits des utilisateurs */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Droits des utilisateurs</h2>
                    <div className="prose">
                        <p>Les utilisateurs disposent des droits suivants :</p>
                        <ul>
                            <li>Droit d'accès</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l'effacement (droit à l'oubli)</li>
                            <li>Droit à la limitation du traitement</li>
                            <li>Droit à la portabilité des données</li>
                            <li>Droit d'opposition</li>
                            <li>Droit de retirer son consentement à tout moment</li>
                        </ul>
                        <p>Les utilisateurs peuvent exercer ces droits via leur profil.</p>
                    </div>
                </section>

                {/* Sécurité des données */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Sécurité des données</h2>
                    <div className="prose">
                        <p>
                            Des mesures techniques et organisationnelles sont mises en place pour garantir la sécurité des données, notamment le chiffrement et un accès restreint aux données. L'application est hébergée sur des serveurs européens via Microsoft Azure, garantissant ainsi un haut niveau de protection et de conformité aux normes RGPD.
                        </p>
                    </div>
                </section>

                {/* Partage des données */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Partage des données</h2>
                    <div className="prose">
                        <p>Les données personnelles ne sont partagées avec aucun tiers.</p>
                    </div>
                </section>

                {/* Contact et réclamation */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Contact et réclamation</h2>
                    <div className="prose">
                        <p>
                            Pour toute question ou réclamation, l'utilisateur peut contacter{' '}
                            <a href="mailto:contact@cafthe.fr" className="text-blue-600 hover:text-blue-800">
                                contact@cafthe.fr
                            </a>
                            . En cas de litige, il peut saisir la CNIL.
                        </p>
                    </div>
                </section>

                {/* Mise à jour de la politique */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">11. Mise à jour de la politique</h2>
                    <div className="prose">
                        <p>
                            Cette politique peut être modifiée. Les utilisateurs seront informés de toute modification significative.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default RGPD