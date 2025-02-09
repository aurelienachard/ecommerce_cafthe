import { useState } from "react"

const Fortgetpwd = () => {
    const [utilisateurs_adresse_email, set_utilisateurs_adresse_email] = useState('')
    const [utilisateurs_mot_de_passe, set_utilisateurs_mot_de_passe] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const handleSubmit = (event) => {
        event.prevenDefault()
    }

    return (
        <div className="flex flex-col items-center p-[24px]">
            <div className="bg-warm-neutral border p-[24px]">
                <h1 className="text-[32px] font-[Roboto] mb-[24px] font-bold">Reinitialiser son mot de passe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-[16px]">Adresse Email</label>
                        <input className="border bg-white p-[16px] mt-[10px] mb-[20px] w-150" placeholder="Adresse Email" type="mail"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Ancien Mot de passe</label>
                        <input className="border bg-white p-[16px] mt-[10px] mb-[20px] w-150" placeholder="Ancien Mot de passe" type="password"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Nouveau mot de passe</label>
                        <input className="border bg-white p-[16px] mt-[10px] w-150" placeholder="Nouveau mot de passe" type="password"/>
                    </div>

                    <button className="bg-green-principale p-[16px] mt-[24px] text-white w-150">Confirmation</button>
                </form>
            </div>
        </div>
    )
}

export default Fortgetpwd