import { useState } from "react"
import axios from 'axios'
import ChampForgetPwd from '../components/champForgetPwd'

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
                        <ChampForgetPwd 
                            utilisateurs_adresse_email={utilisateurs_adresse_email}
                            oldPassword={oldPassword}
                            newPassword={newPassword}
                            handleChangeEmail={handleChangeEmail}
                            handleChangeOldPassword={handleChangeOldPassword}
                            handleChangeNewPassword={handleChangeNewPassword}
                            message={message}
                        />

                        <button 
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-[16px] py-[12px] font-semibold text-white shadow-xs hover:bg-emerald-500">
                            Confirmation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Fortgetpwd