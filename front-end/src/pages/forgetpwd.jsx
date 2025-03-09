import { useState } from "react"
import axios from 'axios'

const Fortgetpwd = () => {
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.prevenDefault() // empecher le rechargement de la page a cause du formulaire
        const token = localStorage.getItem('token') // recupere le token

        // on defini les valeurs a envoyer
        const data = {
            oldPassword,
            newPassword
        }

        // utilisation d'axios avec le verb put pour mettre a jour des informations
        // data contient les donnees a envoyer au serveur

        axios.put('http://localhost:3001/utilisateurs/newpassword', data, {
            headers: {
                'Authorization' : `Bearer ${token}`
                // le headers contient le token
            }
        })
        .then((response) => {
            setMessage(response.data)
            setMessage('mot de passe mis a jour')
        })
        .catch((error) => {
            console.log(error)
            setMessage('mot de passe non mis a jour')
        })
    }

    const handleChangeEmail = (event) => {
        set_utilisateurs_adresse_email(event.target.value)
    }

    const handleChangeOldPassword = (event) => {
        setOldPassword(event.target.value)
    }

    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col py-12 justify-center bg-gray-50 sm:px-[24px] lg:px-[32px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-[24px] text-center text-[24px] font-bold tracking-tight text-gray-900">
                    Reinitialiser son mot de passe
                </h2>
            </div>

            <div className="mt-[42px] sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-[24px] py-[48px] shadow-sm sm:rounded-lg sm:px-[48px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label>
                                Adresse Email
                            </label>

                            <div className="mt-[10px]">
                                <input
                                    onChange={handleChangeEmail}
                                    value={utilisateurs_adresse_email}
                                    placeholder="Adresse Email"
                                    type="mail"
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label>
                                Ancien Mot de passe
                            </label>

                            <div className="mt-[10px]">
                                <input
                                    onChange={handleChangeOldPassword}
                                    value={oldPassword}
                                    placeholder="Ancien Mot de passe"
                                    type="password"
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label>
                                Nouveau mot de passe
                            </label>

                            <div className="mt-[10px]">
                                <input
                                    onChange={handleChangeNewPassword}
                                    value={newPassword}
                                    placeholder="Nouveau mot de passe"
                                    type="password"
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-[16px] py-[12px] font-semibold text-white shadow-xs hover:bg-emerald-500">
                            Confirmation
                        </button>

                        <p>{message}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Fortgetpwd