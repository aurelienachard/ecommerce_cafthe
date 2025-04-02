import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Profile = () => {
    const [username, setUsername] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${import.meta.env.VITE_DOMAIN_API}/utilisateurs/profil`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        })
        .then(response => {
            setUsername(response.data.utilisateurs_nom)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section avec le nom d'utilisateur */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Mon Profil
                    </h1>
                    <p className="mt-6 text-xl text-gray-500">
                        Bonjour, {username}!
                    </p>
                </div>
            </div>

            {/* Section des options du profil */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-6">
                    {/* Carte pour modifier le mot de passe */}
                    <Link to="/fortgetpwd" 
                        className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 flex-1 basis-[calc(50%-12px)] min-w-[280px]">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Modifier mon mot de passe
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Sécurisez votre compte en mettant à jour votre mot de passe
                            </p>
                        </div>
                    </Link>

                    {/* Carte pour modifier le profil */}
                    <Link to="/profileconfig"
                        className="bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 flex-1 basis-[calc(50%-12px)] min-w-[280px]">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Modifier mon profil
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Mettez à jour vos informations personnelles
                            </p>
                        </div>
                    </Link>

                    {/* Carte pour modifier l'adresse postale */}
                    <Link to="/postalconfig"
                        className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 flex-1 basis-[calc(50%-12px)] min-w-[280px]">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Modifier mon adresse postale
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Gérez vos adresses de livraison
                            </p>
                        </div>
                    </Link>

                    {/* Carte pour voir les commandes */}
                    <Link to="/commande"
                        className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-emerald-500 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 flex-1 basis-[calc(50%-12px)] min-w-[280px]">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Mes commandes
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Consultez l&apos;historique de vos commandes
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile