import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import ChampConnexion from '../components/champConnexion'

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
            localStorage.setItem('token', response.data.token)
            navigate('/profile')
            window.location.reload()
        })
        .catch((error) => {
            setMessage('Un problème est survenu lors de la connexion')
            console.log(error)
        })
    }

    return (
        <div className="flex min-h-full flex-1 flex-col py-[48px] justify-center bg-gray-50 sm:px-[24px] lg:px-[32px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-[24px] text-center text-[24px] font-bold tracking-tight text-gray-900">
                    Connectez-vous à votre compte
                </h2>
            </div>
            
            <div className="mt-[42px] sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-[24px] py-[48px] shadow-sm sm:rounded-lg sm:px-[48px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <ChampConnexion 
                            utilisateurs_adresse_email={utilisateurs_adresse_email}
                            utilisateurs_mot_de_passe={utilisateurs_mot_de_passe}
                            handleChangeEmail={handleChangeEmail}
                            handleChangePassword={handleChangePassword}
                            message={message}
                        />

                        <div className="text-[16px]">
                            <Link 
                                to="/fortgetpwd" 
                                className="font-semibold text-emerald-600 hover:text-emerald-500">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <button
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-[16px] py-[12px] font-semibold text-white shadow-xs hover:bg-emerald-500">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>

            <p className="mt-[42px] text-center text-[16px] text-gray-500">
                Pas encore inscrit ?
                <Link
                    to="/inscription"
                    className="font-semibold text-emerald-600 hover:text-emerald-500"> Inscrivez-vous
                </Link>
            </p>
        </div>
    )    
}

export default Connexion