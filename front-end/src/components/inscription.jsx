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
        <div className="flex flex-col items-center p-[24px]">
            <h1 className="text-[32px] font-bold py-[16px]">Inscription</h1>

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <label>Nom</label>
                    <input className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_nom} onChange={handleChangeNom} required/>
                </div>

                <div className="flex flex-col">
                    <label>Prenom</label>
                    <input className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_prenom} onChange={handleChangePrenom} required/>
                </div>

                <div className="flex flex-col">
                    <label>Adresse Email</label>
                    <input className="border p-[16px] my-[20px] w-150" type="email" value={utilisateurs_adresse_email} onChange={handleChangeAdresseEmail} required/>
                </div>

                <div className="flex flex-col">
                    <label>Mot de passe</label>
                    <input className="border p-[16px] my-[20px] w-150" type="password" value={utilisateurs_mot_de_passe} onChange={handleChangeMotDePasse} required/>
                </div>

                <div className="flex flex-col">
                    <label>Numero de telephone</label>
                    <input className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_numero_de_telephone} onChange={handleChangeNumeroDeTelephone}/>
                </div>

                <button className="bg-green-950 p-[16px] mt-[20px] text-white w-150" type="submit">S'inscrire</button>

                <p className="mt-[20px] w-150">
                    Deja inscrit ?
                    <Link to="/connexion" className="text-green-700"> Connectez-vous</Link>
                </p>
            </form>
        </div>
    )
}

export default Inscription