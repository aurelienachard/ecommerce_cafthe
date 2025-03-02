import { useState, useEffect } from "react"
import axios from 'axios'

const ProfileConfig = () => {
    const [utilisateurs_nom, set_utilisateurs_nom] = useState('')
    const [utilisateurs_prenom, set_utilisateurs_prenom] = useState('')
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_numero_de_telephone, set_utilisateurs_numero_de_telephone] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        // verification du token
        if (token) {
            axios.get('http://localhost:3001/utilisateurs/profil', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log('Données utilisateur récupérées:', response.data); // Vérifiez les données ici

                /*
    
                    (|| '') il permet de definir les valeurs initiales des etats pour ne dire qu'ils ne sont jamais undefined
                    on utilise '' une chaine vide comme valeur par defaut
    
                    Entrée contrôlée : Une entrée est dite contrôlée lorsque sa valeur est gérée par l'état du composant. Cela signifie que la valeur de l'entrée est toujours synchronisée avec l'état du composant.
                    Entrée non contrôlée : Une entrée est non contrôlée lorsque sa valeur est gérée par le DOM lui-même, sans synchronisation avec l'état du composant.
    
                    Valeurs de secours : En utilisant userData.utilisateurs_nom || '', vous vous assurez que même si userData.utilisateurs_nom est undefined, l'état sera mis à jour avec une chaîne vide, évitant ainsi le passage à une entrée non contrôlée.
                */
    
                    const userData = response.data;
                    set_utilisateurs_nom(userData.utilisateurs_nom || '');
                    set_utilisateurs_prenom(userData.utilisateurs_prenom || '');
                    set_utilisateurs_adresse_email(userData.utilisateurs_adresse_email || '');
                    set_utilisateurs_numero_de_telephone(userData.utilisateurs_numero_de_telephone || '');
                })
                .catch((error) => {
                    console.log('Erreur lors de la récupération des données:', error);
                    setMessage('Erreur de récupération des données');
                });
        } else {
            console.log('token non trouve')
        }
    }, []) // le tableau vide est pour que useeffect se lance une fois

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        const data = {
            utilisateurs_nom,
            utilisateurs_prenom,
            utilisateurs_adresse_email,
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

    const handleChangeNumeroDeTelephone = (event) => {
        set_utilisateurs_numero_de_telephone(event.target.value)
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-[24px]">
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
                        <label className="mt-[20px]">Numero de telephone</label>
                        <input value={utilisateurs_numero_de_telephone} onChange={handleChangeNumeroDeTelephone} placeholder="Numero de telephone" type="text" className="border bg-white p-[16px] mt-[10px] w-150"/>
                    </div>

                    <button type="submit" className="bg-green-principale p-[16px] mt-[24px] text-white w-150">Mettre a jour</button>
                
                    <p>{message}</p>
                </form>
            </div>
        </div>
    )
}

export default ProfileConfig