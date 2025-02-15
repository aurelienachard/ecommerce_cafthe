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
        <div className="min-h-screen flex flex-col items-center p-[24px]">
            <div className="bg-warm-neutral border p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] font-bold">Reinitialiser son mot de passe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-[16px]">Adresse Email</label>
                        <input onChange={handleChangeEmail} value={utilisateurs_adresse_email} className="border bg-white p-[16px] mt-[10px] mb-[20px] w-150" placeholder="Adresse Email" type="mail" required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Ancien Mot de passe</label>
                        <input onChange={handleChangeOldPassword} value={oldPassword} className="border bg-white p-[16px] mt-[10px] mb-[20px] w-150" placeholder="Ancien Mot de passe" type="password" required/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Nouveau mot de passe</label>
                        <input onChange={handleChangeNewPassword} value={newPassword} className="border bg-white p-[16px] mt-[10px] w-150" placeholder="Nouveau mot de passe" type="password" required/>
                    </div>

                    <button className="bg-green-principale p-[16px] mt-[24px] text-white w-150">Confirmation</button>

                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default Fortgetpwd