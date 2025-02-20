import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'

const Profile = () => {
    const [username, setUsername] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get('http://localhost:3001/utilisateurs/profil', {
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
        <div className="min-h-screen p-[24px]">
            <h1 className="text-[32px] font-bold">Profile</h1>

            <p className="text-[24px]">Bonjour, {username}!</p>

            <div className="flex flex-col">
                <Link to="/fortgetpwd" className=" mt-[16px] text-green-principale">Modifier son mot de passe</Link>
                <Link to="/profileconfig" className=" mt-[16px] text-green-principale">Modifier son profil</Link>
                <Link to="/postalconfig" className=" mt-[16px] text-green-principale">Modifier son adresse postal</Link>
                <Link to="/commande" className="mt-[16px] text-green-principale">Voir les commandes</Link>
            </div>
        </div>
    )
}

export default Profile