import { useState } from "react"

const PostalConfig = () => {
    const [adresses_postales_numero_voie, set_adresses_postales_numero_voie] = useState('')
    const [adresses_postales_nom_voie, set_adresses_postales_nom_voie] = useState('')
    const [adresses_postales_code_postal, set_adresses_postales_code_postal] = useState('')
    const [adresses_postales_ville, set_adresses_postales_ville] = useState('')
    const [adresses_postales_pays, set_adresses_postales_pays] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleChangeAdressePostalesNumeroDeVoie = (event) => {
        set_adresses_postales_numero_voie(event.target.value)
    }

    const handleChangeAdressePostalesNomVoie = (event) => {
        set_adresses_postales_nom_voie(event.target.value)
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
        <div className="flex flex-col items-center p-[24px]">
            <div className="bg-warm-neutral border p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] font-bold text-center">Modifier son adresse postal</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mt-[20px]">Numero de voie</label>
                        <input placeholder="Numero de voie" onChange={handleChangeAdressePostalesNumeroDeVoie} value={adresses_postales_numero_voie} type="text" className="border bg-white mt-[10px] p-[16px] w-150" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Nom de voie</label>
                        <input placeholder="Nom de voie" onChange={handleChangeAdressePostalesNomVoie} value={adresses_postales_nom_voie} type="text" className="border bg-white mt-[10px] p-[16px] w-150" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Code postal</label>
                        <input placeholder="Code postal" onChange={handleChangeAdressePostalesCodePostal} value={adresses_postales_code_postal} type="text" className="border bg-white mt-[10px] p-[16px] w-150" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Ville</label>
                        <input placeholder="Ville" onChange={handleChangeAdressePostalesVille} value={adresses_postales_ville} type="text" className="border bg-white mt-[10px] p-[16px] w-150" />
                    </div>

                    <div className="flex flex-col">
                        <label className="mt-[20px]">Pays</label>
                        <input placeholder="Pays" onChange={handleChangeAdressePostalesPays} value={adresses_postales_pays} type="text" className="border bg-white mt-[10px] p-[16px] w-150" />
                    </div>

                    <button className="bg-green-principale p-[16px] mt-[24px] text-white w-150">Mettre a jour</button>
                </form>
            </div>
        </div>
    )
}

export default PostalConfig