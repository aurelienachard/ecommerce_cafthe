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
        <div className="min-h-screen flex flex-col items-center p-[32px]">
            <div className="bg-neutral shadow-md p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] ml-[24px] mt-[24px] font-bold">Inscription</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label>Nom</label>
                        <input placeholder="Nom" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" type="text" value={utilisateurs_nom} onChange={handleChangeNom} required/>
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Prenom</label>
                        <input placeholder="Prenom" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" type="text" value={utilisateurs_prenom} onChange={handleChangePrenom} required/>
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Adresse Email</label>
                        <input placeholder="Adresse Email" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" type="email" value={utilisateurs_adresse_email} onChange={handleChangeAdresseEmail} required/>
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Mot de passe</label>
                        <input placeholder="Mot de passe" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" type="password" value={utilisateurs_mot_de_passe} onChange={handleChangeMotDePasse} required/>
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Numero de telephone</label>
                        <input placeholder="Numero de telephone" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" type="text" value={utilisateurs_numero_de_telephone} onChange={handleChangeNumeroDeTelephone}/>
                    </div>

                    <button className="mr-[24px] ml-[24px] bg-green-principale rounded-md px-[12px] py-[16px] mt-[24px] text-white w-[384px]" type="submit">Inscription</button>

                    <p className="mt-[20px] mr-[24px] ml-[24px] mb-[24px]">
                        Deja inscrit ?
                        <Link to="/connexion" className="text-green-700 text-[16px]"> Connectez-vous</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Inscription