import { useEffect, useState } from "react"
import axios from 'axios'

const Profile = () => {
    const [utilisateurs_nom, setUtilisateursNom] = useState('')
    const [utilisateurs_prenom, setUtilisateursPrenom] = useState('')
    const [utilisateurs_adresse_email, setUtilisateursAdresseEmail] = useState('')
    const [utilisateurs_mot_de_passe, setUtilisateursMotDePasse] = useState('')
    const [utilisateurs_numero_de_telephone, setUtilisateursNumeroDeTelephone] = useState('')
    
    const [adresses_postales_numero_voie, setAddressesPostalNumeroVoie] = useState('')
    const [adresses_postales_nom_voie, setAddressesPostalNomVoie] = useState('')
    const [adresses_postales_code_postal, setAddressesPostalCodePostal] = useState('')
    const [adresses_postales_ville, setAddressesPostalVille] = useState('')
    const [adresses_postales_pays, setAddressesPostalPays] = useState('')
    
    const [message, setMessage] = useState('')

    const handleChangeNom = (event) => {
        setUtilisateursNom(event.target.value)
    }

    const handleChangePrenom = (event) => {
        setUtilisateursPrenom(event.target.value)
    }

    const handleChangeEmail = (event) => {
        setUtilisateursAdresseEmail(event.target.value)
    }

    const handleChangeMotDePasse = (event) => {
        setUtilisateursMotDePasse(event.target.value)
    }

    const handleChangeNumeroDeTelephone = (event) => {
        setUtilisateursNumeroDeTelephone(event.target.value)
    }

    const handleChangeAdressePostaleNumeroVoie = (event) => {
        setAddressesPostalNumeroVoie(event.target.value)
    }
    
    const handleChangeAdressePostaleNomVoie = (event) => {
        setAddressesPostalNomVoie(event.target.value)
    }
    
    const handleChangeAdressePostaleCodePostal = (event) => {
        setAddressesPostalCodePostal(event.target.value)
    }
    
    const handleChangeAdressePostaleVille = (event) => {
        setAddressesPostalVille(event.target.value)
    }
    
    const handleChangeAdressePostalePays = (event) => {
        setAddressesPostalPays(event.target.value)
    }

    const handleSubmitUser = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        axios.put('http://localhost:3001/utilisateurs/', {
            utilisateurs_nom,
            utilisateurs_prenom,
            utilisateurs_adresse_email,
            utilisateurs_mot_de_passe,
            utilisateurs_numero_de_telephone
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setMessage('Profile mise à jour')
        })
        .catch((error) => {
            setMessage('Échec de la mise à jour du profil')
            console.log(error)
        })
    }

    const handleSubmitAdressePostal = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        axios.put('http://localhost:3001/adresse/', {
            adresses_postales_numero_voie,
            adresses_postales_nom_voie,
            adresses_postales_code_postal,
            adresses_postales_ville,
            adresses_postales_pays
        }, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then ((response) => {
            setMessage('Adresse mise a jour')
        })
        .catch((error) => {
            setMessage("Echec de la mise a jour de l'adresse postal")
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col items-center p-[24px]">
            <h1 className="text-[32px] font-bold py-[16px]">Profile</h1>

            <form onSubmit={handleSubmitUser}>
                <div className="flex flex-col">
                    <label>Nom</label>
                    <input placeholder="Nom" className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_nom} onChange={handleChangeNom}/>
                </div>

                <div className="flex flex-col">
                    <label>Prenom</label>
                    <input placeholder="Prenom" className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_prenom} onChange={handleChangePrenom}/>
                </div>

                <div className="flex flex-col">
                    <label>Adresse Email</label>
                    <input placeholder="Adresse Email" className="border p-[16px] my-[20px] w-150" type="email" value={utilisateurs_adresse_email} onChange={handleChangeEmail}/>
                </div>

                <div className="flex flex-col">
                    <label>Mot de passe</label>
                    <input placeholder="Mot de passe" className="border p-[16px] my-[20px] w-150" type="password" value={utilisateurs_mot_de_passe} onChange={handleChangeMotDePasse}/>
                </div>

                <div className="flex flex-col">
                    <label>Telephone</label>
                    <input placeholder="Telephone" className="border p-[16px] my-[20px] w-150" type="text" value={utilisateurs_numero_de_telephone} onChange={handleChangeNumeroDeTelephone}/>
                </div>

                <button className="bg-green-950 p-[16px] mt-[20px] text-white w-150" type="submit">Mettre à jour le profil</button>

                <p>{message}</p>
            </form>

            <form onSubmit={handleSubmitAdressePostal}>
                <h1 className="text-[32px] font-bold mt-[20px] text-center">Mon adresse postal</h1>
                
                <div>
                    <label className="block mt-[20px] mb-[10px]">Numero de voie</label>
                    <input placeholder="Numero de voie" type="text" className="border w-150 py-[12px] px-[16px]" value={adresses_postales_numero_voie} onChange={handleChangeAdressePostaleNumeroVoie}/>
                </div>

                <div>
                    <label className="block mt-[20px] mb-[10px]">Nom de voie</label>
                    <input placeholder="Nom de voie" type="text" className="border w-150 py-[12px] px-[16px]" value={adresses_postales_nom_voie} onChange={handleChangeAdressePostaleNomVoie}/>
                </div>

                <div>
                    <label className="block mt-[20px] mb-[10px]">Code Postal</label>
                    <input placeholder="Code postal" type="text" className="border w-150 py-[12px] px-[16px]" value={adresses_postales_code_postal} onChange={handleChangeAdressePostaleCodePostal}/>
                </div>

                <div>
                    <label className="block mt-[20px] mb-[10px]">Ville</label>
                    <input placeholder="Ville" type="text" className="border w-150 py-[12px] px-[16px]" value={adresses_postales_ville} onChange={handleChangeAdressePostaleVille}/>
                </div>

                <div>
                    <label className="block mt-[20px] mb-[10px]">Pays</label>
                    <input placeholder="Pays" type="text" className="border w-150 py-[12px] px-[16px]" value={adresses_postales_pays} onChange={handleChangeAdressePostalePays}/>
                </div>

                <button className="bg-green-950 p-[16px] text-white mt-[36px] w-150" type="submit">Mettre a jour mon adresse postal</button>

                <p>{message}</p>
            </form>
        </div>
    )
}

export default Profile