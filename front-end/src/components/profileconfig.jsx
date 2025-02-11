import { useState } from "react"
import axios from 'axios'

const ProfileConfig = () => {
    const [utilisateurs_nom, set_utilisateurs_nom] = useState('')
    const [utilisateurs_prenom, set_utilisateurs_prenom] = useState('')
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_mot_de_passe, set_utilisateurs_mot_de_passe] = useState('')
    const [utilisateurs_numero_de_telephone, set_utilisateurs_numero_de_telephone] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        const data = {
            utilisateurs_nom,
            utilisateurs_prenom,
            utilisateurs_adresse_email,
            utilisateurs_mot_de_passe,
            utilisateurs_numero_de_telephone,
        }

        axios.put('http://localhost:3001/utilisateurs/modificationProfil', data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((response) => {
            setMessage(response.data)
            setMessage('profil mise a jour')
        })
        .catch((error) => {
            console.log(error)
            setMessage('profil non mise a jour')
        })
    }

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

    return (
        <div className="flex flex-col items-center p-[24px]">
            <div className="bg-warm-neutral border p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] font-bold text-center">Modifier son profil</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mt-[20px]">Nom</label>
                        <input value={utilisateurs_nom} onChange={handleChangeNom} placeholder="Nom" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Prenom</label>
                        <input value={utilisateurs_prenom} onChange={handleChangePrenom} placeholder="Prenom" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Adresse Email</label>
                        <input value={utilisateurs_adresse_email} onChange={handleChangeAdresseEmail} placeholder="Adresse Email" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="mt-[20px]">Mot de passe</label>
                        <input value={utilisateurs_mot_de_passe} onChange={handleChangeMotDePasse} placeholder="Mot de passe" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Numero de telephone</label>
                        <input value={utilisateurs_numero_de_telephone} onChange={handleChangeNumeroDeTelephone} placeholder="Numero de telephone" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>

                    <button className="bg-green-principale p-[16px] mt-[24px] text-white w-150">Mettre a jour</button>
                
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default ProfileConfig