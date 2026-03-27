const CGV = () => {
    return (
        <div className="min-h-screen p-[24px] max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente (CGV) de Cafthe</h1>
            
            <div className="space-y-8">
                {/* Présentation de l'entreprise */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Présentation de l'entreprise</h2>
                    <div className="prose">
                        <p>
                            Les présentes Conditions Générales de Vente (CGV) sont proposées par Cafthe, société SAS, immatriculée au RCS sous le numéro (ajouter numéro d'immatriculation), dont le siège social est situé 69 Rue du Commerce, 41000 Blois, France.
                        </p>
                        <h3 className="text-xl font-medium mt-4 mb-2">Coordonnées de contact :</h3>
                        <ul className="list-none pl-0">
                            <li>E-mail : contact@cafthe.fr</li>
                            <li>Téléphone : +33 02 42 42 42 42</li>
                        </ul>
                    </div>
                </section>

                {/* Objet et champ d'application */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Objet et champ d'application</h2>
                    <div className="prose">
                        <p>
                            Les présentes CGV régissent les conditions de vente des produits physiques proposés par Cafthe aux particuliers et professionnels, en France uniquement. Toute commande passée sur notre site ou en magasin implique l'acceptation sans réserve des présentes CGV.
                        </p>
                    </div>
                </section>

                {/* Produits et prix */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. Produits et prix</h2>
                    <div className="prose">
                        <p>
                            Les produits vendus par Cafthe sont décrits avec la plus grande précision possible. Toutefois, des variations mineures peuvent exister.
                        </p>
                        <p>
                            Les prix des produits sont indiqués en euros (€), toutes taxes comprises (TTC) pour les particuliers et hors taxes (HT) pour les professionnels. Cafthe se réserve le droit de modifier les prix à tout moment, mais le prix facturé sera celui en vigueur au moment de la commande.
                        </p>
                    </div>
                </section>

                {/* Commandes et modalités de paiement */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Commandes et modalités de paiement</h2>
                    <div className="prose">
                        <p>
                            Le paiement des commandes s'effectue exclusivement par carte bancaire. La commande est confirmée après validation du paiement.
                        </p>
                    </div>
                </section>

                {/* Livraison et retrait en magasin */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Livraison et retrait en magasin</h2>
                    <div className="prose">
                        <h3 className="text-xl font-medium mt-4 mb-2">Délais et modes de livraison</h3>
                        <ul>
                            <li>La livraison des produits est effectuée sous 3 à 7 jours ouvrés.</li>
                            <li>Le client peut également retirer sa commande directement en magasin à l'adresse mentionnée ci-dessus.</li>
                        </ul>
                        <p>
                            Les délais de livraison sont indicatifs et peuvent varier en fonction du transporteur. Cafthe ne saurait être tenu responsable des retards indépendants de sa volonté.
                        </p>
                    </div>
                </section>

                {/* Droit de rétractation et retours */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Droit de rétractation et retours</h2>
                    <div className="prose">
                        <p>
                            Conformément à la législation en vigueur, le client dispose d'un délai de 14 jours à compter de la réception du produit pour exercer son droit de rétractation sans justification.
                        </p>
                        <p>
                            Pour exercer ce droit, le client doit notifier Cafthe par e-mail à contact@cafthe.fr en précisant son numéro de commande.
                        </p>
                        <h3 className="text-xl font-medium mt-4 mb-2">Conditions de retour</h3>
                        <ul>
                            <li>Le produit doit être retourné dans son état d'origine, non utilisé et dans son emballage d'origine.</li>
                            <li>Les frais de retour sont à la charge du client.</li>
                            <li>Le remboursement sera effectué dans un délai de 14 jours après réception et vérification du produit retourné.</li>
                        </ul>
                    </div>
                </section>

                {/* Garanties et service après-vente */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">7. Garanties et service après-vente</h2>
                    <div className="prose">
                        <p>
                            Les produits vendus par Cafthe ne bénéficient pas de garantie spécifique au-delà des garanties légales de conformité et des vices cachés. Aucun service après-vente spécifique n'est proposé.
                        </p>
                    </div>
                </section>

                {/* Responsabilité */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">8. Responsabilité</h2>
                    <div className="prose">
                        <p>
                            Cafthe ne pourra être tenu responsable des dommages résultant d'une mauvaise utilisation des produits par le client. De même, sa responsabilité ne saurait être engagée en cas d'indisponibilité du site internet, de perturbations liées aux services de paiement ou de retard de livraison dû aux transporteurs.
                        </p>
                    </div>
                </section>

                {/* Protection des données personnelles */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">9. Protection des données personnelles</h2>
                    <div className="prose">
                        <p>
                            Les informations personnelles collectées lors des commandes sont utilisées uniquement dans le cadre de la gestion des achats et ne sont en aucun cas revendues à des tiers. Conformément au RGPD, le client dispose d'un droit d'accès, de rectification et de suppression de ses données en contactant contact@cafthe.fr.
                        </p>
                    </div>
                </section>

                {/* Droit applicable et litiges */}
                <section>
                    <h2 className="text-2xl font-semibold mb-4">10. Droit applicable et litiges</h2>
                    <div className="prose">
                        <p>
                            Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera privilégiée. À défaut d'accord, les tribunaux compétents seront ceux du ressort du siège social de Cafthe.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CGV