import { useState, useEffect } from "react"
import axios from 'axios'
import { XCircleIcon } from '@heroicons/react/20/solid'

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
        <div className="flex min-h-full flex-1 flex-col py-[48px] justify-center bg-gray-50 sm:px-[24px] lg:px-[32px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-[24px] text-center text-[24px] font-bold tracking-tight text-gray-900">
                    Modifier votre profil
                </h2>
            </div>

            <div className="mt-[42px] sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-[24px] py-[48px] shadow-sm sm:rounded-lg sm:px-[48px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {message && (
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="shrink-0">
                                        <div className="flex">
                                            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" /> 
                                            <p className="ml-[10px] text-sm font-medium text-red-800">{message}</p>
                                        </div>
                                    </div>
                                </div>  
                            </div>
                        )}

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Nom
                            </label>
                            <div className="mt-[10px]">
                                <input 
                                    value={utilisateurs_nom} 
                                    onChange={handleChangeNom} 
                                    placeholder="Nom" 
                                    type="text" 
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Prénom
                            </label>
                            <div className="mt-[10px]">
                                <input 
                                    value={utilisateurs_prenom} 
                                    onChange={handleChangePrenom} 
                                    placeholder="Prénom" 
                                    type="text" 
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Adresse Email
                            </label>
                            <div className="mt-[10px]">
                                <input 
                                    value={utilisateurs_adresse_email} 
                                    onChange={handleChangeAdresseEmail} 
                                    placeholder="Adresse Email" 
                                    type="email" 
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[16px] font-medium text-gray-900">
                                Numéro de téléphone
                            </label>
                            <div className="mt-[10px]">
                                <input 
                                    value={utilisateurs_numero_de_telephone} 
                                    onChange={handleChangeNumeroDeTelephone} 
                                    placeholder="Numéro de téléphone" 
                                    type="tel" 
                                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-emerald-600 px-[16px] py-[12px] font-semibold text-white shadow-xs hover:bg-emerald-500">
                            Mettre à jour
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileConfig