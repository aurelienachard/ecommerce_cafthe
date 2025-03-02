import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'

const Inscription = () => {
    const [utilisateurs_nom, set_utilisateurs_nom] = useState('')
    const [utilisateurs_prenom, set_utilisateurs_prenom] = useState('')
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_mot_de_passe, set_utilisateurs_mot_de_passe] = useState('')
    const [utilisateurs_numero_de_telephone, set_utilisateurs_numero_de_telephone] = useState('')
    const navigate = useNavigate()

    const handleChangeNom = (event) => {
        set_utilisateurs_nom(event.target.value)
    }

    const handleChangePrenom = (event) => {
        set_utilisateurs_prenom(event.target.value)
    }

    const handleChangeAdresseEmail = (event) => {
        set_utilisateurs_adresse_email(event.target.value)
    }

    const handleChangeMotDePasse = (event) => {
        set_utilisateurs_mot_de_passe(event.target.value)
    }

    const handleChangeNumeroDeTelephone = (event) => {
        set_utilisateurs_numero_de_telephone(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:3001/utilisateurs/inscription', {
            utilisateurs_nom,
            utilisateurs_prenom,
            utilisateurs_adresse_email,
            utilisateurs_mot_de_passe,
            utilisateurs_numero_de_telephone
        })
        .then((response) => {
            navigate('/connexion')
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex min-h-full flex-1 flex-col py-12 justify-center bg-gray-50 sm:px-[24px] lg:px-[32px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-[24px] text-center text-[24px] font-bold tracking-tight text-gray-900">
                    Inscrivez-vous pour vous connecter
                </h2>
            </div>
                
            <div className="mt-[42px] sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-[24px] py-[48px] shadow-sm sm:rounded-lg sm:px-[48px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Nom
                            </label>
                            
                            <div className="mt-[10px]">
                                <input
                                    placeholder="Nom"
                                    type="text"
                                    value={utilisateurs_nom} 
                                    onChange={handleChangeNom}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Prénom
                            </label>

                            <div className="mt-[10px]">                
                                <input 
                                    placeholder="Prénom"
                                    type="text"
                                    value={utilisateurs_prenom}
                                    onChange={handleChangePrenom}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>    
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Adresse Email
                            </label>
                            
                            <div className="mt-[10px]">
                                <input 
                                    placeholder="Adresse Email"
                                    type="email"
                                    value={utilisateurs_adresse_email}
                                    onChange={handleChangeAdresseEmail}
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
                                    onChange={handleChangeMotDePasse}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Numéro de téléphone
                            </label>
                            <div className="mt-[10px]">
                                <input
                                    placeholder="Numéro de téléphone"
                                    type="text"
                                    value={utilisateurs_numero_de_telephone}
                                    onChange={handleChangeNumeroDeTelephone}
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 font-semibold text-white shadow-xs hover:bg-green-500"
                            type="submit">
                            Inscription
                        </button>
                    </form>
                </div>
                <p className="mt-[42px] text-center text-[16px] text-gray-500">
                    Déjà inscrit ?
                    <Link to="/connexion" className="font-semibold text-green-600 hover:text-green-500"> Connectez-vous</Link>
                </p>
            </div>
        </div>
    )
}

export default Inscription