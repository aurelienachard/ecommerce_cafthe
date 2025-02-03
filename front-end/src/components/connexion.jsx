import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'

// on utilise setUser en parametre de la fonction pour mettre a jour 

const Connexion = ({setUser}) => {
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_mot_de_passe, set_utilisateurs_mot_de_passe] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleChangeEmail = (event) => {
        set_utilisateurs_adresse_email(event.target.value)
    }

    const handleChangePassword = (event) => {
        set_utilisateurs_mot_de_passe(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const data = {
            utilisateurs_adresse_email,
            utilisateurs_mot_de_passe
        }
        
        axios.post('http://localhost:3001/utilisateurs/connexion', data, {
            headers: {
                'Content-type' : 'application/json'
            }
        })
        .then((response) => {
            setMessage('Connexion reussi')
            localStorage.setItem('token', response.data.token)
            setUser(true) // on defini setUser sur true
            navigate('/profile')
        })
        .catch((error) => {
            setMessage('Connexion echoue')
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col items-center p-[24px]">
            <h1 className="text-[32px] font-bold py-[16px]">Connexion</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>Adresse Email</label>
                    <input className="border p-[16px] my-[20px] w-150" type="mail" value={utilisateurs_adresse_email} onChange={handleChangeEmail} required/>
                </div>

                <div className="flex flex-col">
                    <label>Mot de passe</label>
                    <input className="border p-[16px] mt-[20px] w-150" type="password" value={utilisateurs_mot_de_passe} onChange={handleChangePassword} required/>
                </div>

                <button className="bg-green-950 p-[16px] mt-[20px] text-white w-150">Se connecter</button>
                <p>{message}</p>
            </form>

            <p className="mt-[20px] w-150">
                Pas encore inscrit ?
                <Link to="/inscription" className="text-green-700"> Inscrivez-vous</Link>
            </p>
        </div>
    )    
}

export default Connexion