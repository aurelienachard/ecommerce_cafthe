import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
import ChampInscription from '../components/champInscription'

const Inscription = () => {
    const [utilisateurs_nom, set_utilisateurs_nom] = useState('')
    const [utilisateurs_prenom, set_utilisateurs_prenom] = useState('')
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_mot_de_passe, set_utilisateurs_mot_de_passe] = useState('')
    const [utilisateurs_numero_de_telephone, set_utilisateurs_numero_de_telephone] = useState('')
    const [message, setMessage] = useState('')
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
            setMessage("Un problème est survenu lors de l'inscription")
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
                        <ChampInscription 
                            utilisateurs_nom={utilisateurs_nom}
                            utilisateurs_prenom={utilisateurs_prenom}
                            utilisateurs_adresse_email={utilisateurs_adresse_email}
                            utilisateurs_mot_de_passe={utilisateurs_mot_de_passe}
                            utilisateurs_numero_de_telephone={utilisateurs_numero_de_telephone}
                            handleChangeNom={handleChangeNom}
                            handleChangePrenom={handleChangePrenom}
                            handleChangeAdresseEmail={handleChangeAdresseEmail}
                            handleChangeMotDePasse={handleChangeMotDePasse}
                            handleChangeNumeroDeTelephone={handleChangeNumeroDeTelephone}
                            message={message}
                        />

                        <button
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-[16px] py-[12px] font-semibold text-white shadow-xs hover:bg-emerald-500"
                            type="submit">
                            Inscription
                        </button>
                    </form>
                </div>
                <p className="mt-[42px] text-center text-[16px] text-gray-500">
                    Déjà inscrit ?
                    <Link to="/connexion" className="font-semibold text-emerald-600 hover:text-emerald-500"> Connectez-vous</Link>
                </p>
            </div>
        </div>
    )
}

export default Inscription