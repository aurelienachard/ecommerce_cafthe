import { useEffect, useState } from "react"
import axios from 'axios'

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
            axios.get('http://localhost:3001/utilisateurs/adresse', {
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

        axios.put('http://localhost:3001/utilisateurs/modificationAdress', data, {
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
        <div className="min-h-screen flex flex-col items-center p-[32px]">
            <div className="bg-neutral shadow-md p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] ml-[24px] mt-[24px] font-bold">Modifier son adresse postal</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Ligne adresse 1</label>
                        <input placeholder="Ligne adresse 1" onChange={handleChangeAdressePostalesNomVoie} value={adresses_postales_ligne1} type="text" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" />
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Ligne adresse 2</label>
                        <input placeholder="Ligne adresse 2" onChange={handleChangeAdressePostalesNomVoie} value={adresses_postales_ligne2} type="text" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" />
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Code postal</label>
                        <input placeholder="Code postal" onChange={handleChangeAdressePostalesCodePostal} value={adresses_postales_code_postal} type="text" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" />
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Ville</label>
                        <input placeholder="Ville" onChange={handleChangeAdressePostalesVille} value={adresses_postales_ville} type="text" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" />
                    </div>

                    <div className="flex flex-col mr-[24px] ml-[24px]">
                        <label className="mt-[20px] text-[16px]">Pays</label>
                        <input placeholder="Pays" onChange={handleChangeAdressePostalesPays} value={adresses_postales_pays} type="text" className="rounded-md bg-grey-input px-[12px] py-[16px] mt-[10px] w-[384px]" />
                    </div>

                    <p>{message}</p>

                    <button className="mr-[24px] ml-[24px] bg-green-principale rounded-md px-[12px] py-[16px] mt-[24px] text-white w-[384px]">Mettre a jour</button>
                </form>
            </div>
        </div>
    )
}

export default PostalConfig