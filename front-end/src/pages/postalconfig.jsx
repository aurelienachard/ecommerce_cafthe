import { useEffect, useState } from "react"
import axios from 'axios'
import { XCircleIcon } from '@heroicons/react/20/solid'
import ChampPostal from '../components/champPostal'

const PostalConfig = () => {
    const [adresses_postales_ligne1, set_adresses_postales_ligne1] = useState('')
    const [adresses_postales_ligne2, set_adresses_postales_ligne2] = useState('')
    const [adresses_postales_code_postal, set_adresses_postales_code_postal] = useState('')
    const [adresses_postales_ville, set_adresses_postales_ville] = useState('')
    const [adresses_postales_pays, set_adresses_postales_pays] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        // verification du token
        if (token) {
            axios.get(`${import.meta.env.VITE_DOMAIN_API}/utilisateurs/adresse`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log('Données utilisateur récupérées:', response.data)

                const userData = response.data
                set_adresses_postales_ligne1(userData.adresses_postales_ligne1 || '')
                set_adresses_postales_ligne2(userData.adresses_postales_ligne2 || '')
                set_adresses_postales_code_postal(userData.adresses_postales_code_postal || '')
                set_adresses_postales_ville(userData.adresses_postales_ville || '')
                set_adresses_postales_pays(userData.adresses_postales_pays || '')
            })
            .catch((error) => {
                console.log('Erreur lors de la récupération des données:', error);
                setMessage('Erreur de récupération des données');
            })
        } else {
            console.log('token non trouve')
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const token = localStorage.getItem('token')

        const data = {
            adresses_postales_ligne1,
            adresses_postales_ligne2,
            adresses_postales_code_postal,
            adresses_postales_ville,
            adresses_postales_pays,
        }

        axios.put(`${import.meta.env.VITE_DOMAIN_API}/utilisateurs/modificationAdress`, data, {
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

    const handleChangeAdressePostalesNomVoie = (event) => {
        set_adresses_postales_ligne1(event.target.value)
    }

    const handleChangeAdressePostalesCodePostal = (event) => {
        set_adresses_postales_code_postal(event.target.value)
    }

    const handleChangeAdressePostalesVille = (event) => {
        set_adresses_postales_ville(event.target.value)
    }

    const handleChangeAdressePostalesPays = (event) => {
        set_adresses_postales_pays(event.target.value)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col py-[48px] justify-center bg-gray-50 sm:px-[24px] lg:px-[32px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-[24px] text-center text-[24px] font-bold tracking-tight text-gray-900">
                    Modifier votre adresse postale
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

                        <ChampPostal 
                            label="Ligne adresse 1"
                            value={adresses_postales_ligne1}
                            onChange={handleChangeAdressePostalesNomVoie}
                            placeholder="Ligne adresse 1"
                            type="text"
                        />

                        <ChampPostal 
                            label="Ligne adresse 2"
                            value={adresses_postales_ligne2}
                            onChange={handleChangeAdressePostalesNomVoie}
                            placeholder="Ligne adresse 2"
                            type="text"
                        />

                        <ChampPostal 
                            label="Code postal"
                            value={adresses_postales_code_postal}
                            onChange={handleChangeAdressePostalesCodePostal}
                            placeholder="Code postal"
                            type="text"
                        />

                        <ChampPostal 
                            label="Ville"
                            value={adresses_postales_ville}
                            onChange={handleChangeAdressePostalesVille}
                            placeholder="Ville"
                            type="text"
                        />

                        <ChampPostal 
                            label="Pays"
                            value={adresses_postales_pays}
                            onChange={handleChangeAdressePostalesPays}
                            placeholder="Pays"
                            type="text"
                        />

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

export default PostalConfig