import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'

// on utilise setUser en parametre de la fonction pour mettre a jour 

const Connexion = () => {
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
            navigate('/profile')
            window.location.reload()
        })
        .catch((error) => {
            setMessage('Connexion echoue')
            console.log(error)
        })
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-[32px]">
            <div className="bg-neutral shadow-md p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] ml-[24px] mt-[24px] font-bold">Connexion</h1>
                
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="text-[16px]">Adresse Email</label>
                        <input 
                            placeholder="Adresse Email" 
                            className="rounded-md border border-gray-contour bg-grey-input px-[12px] py-[16px] mt-[10px] mb-[20px] w-[384px]" 
                            type="mail" value={utilisateurs_adresse_email} 
                            onChange={handleChangeEmail} 
                            required
                        />
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="text-[16px]">Mot de passe</label>
                        <input 
                            placeholder="Mot de passe" 
                            className="rounded-md border border-gray-contour bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" 
                            type="password" 
                            value={utilisateurs_mot_de_passe} 
                            onChange={handleChangePassword} 
                            required
                        />
                    </div>

                    <button className="mr-[24px] ml-[24px] bg-green-principale rounded-md px-[12px] py-[16px] mt-[24px] text-white w-[384px]">Se connecter</button>
                    <p>{message}</p>
                </form>

                <p className="mt-[20px] mr-[24px] ml-[24px]">
                    Pas encore inscrit ?
                    <Link to="/inscription" className="text-green-700 text-[16px]"> Inscrivez-vous</Link>
                </p>

                <p className="mt-[10px] mb-[24px] mr-[24px] ml-[24px]">
                    Mot de passe oublie ?
                    <Link to="/fortgetpwd" className="text-green-700 text-[16px]"> Clique ici</Link>
                </p>
            </div>
        </div>
    )    
}

export default Connexion