import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { XCircleIcon } from '@heroicons/react/20/solid'
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
                        
                        {message && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="shrink-0">
                                        <div className="flex">
                                            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" /> 
                                            <p className="ml-[10px] text-sm font-medium text-red-800">{message}</p>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        )}

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Adresse Email
                            </label>

                            <div className="mt-[10px]">
                                <input 
                                    placeholder="Adresse Email" 
                                    type="mail"
                                    value={utilisateurs_adresse_email} 
                                    onChange={handleChangeEmail}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Mot de passe
                            </label>

                            <div className="mt-[10px]">
                                <input 
                                    placeholder="Mot de passe" 
                                    type="password" 
                                    value={utilisateurs_mot_de_passe} 
                                    onChange={handleChangePassword}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-[16px]">
                            <Link 
                                to="/fortgetpwd" 
                                className="font-semibold text-green-600 hover:text-green-500">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <button
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-green-500">
                            Se connecter
                        </button>
                    </form>
                </div>
            </div>

            <p className="mt-[42px] text-center text-[16px] text-gray-500">
                Pas encore inscrit ?
                <Link
                    to="/inscription"
                    className="font-semibold text-green-600 hover:text-green-500"> Inscrivez-vous
                </Link>
            </p>
        </div>
    )    
}

export default Connexion