import { XCircleIcon } from '@heroicons/react/20/solid'

const ChampConnexion = ({ utilisateurs_adresse_email, utilisateurs_mot_de_passe, handleChangeEmail, handleChangePassword, message }) => {
    return (
        <>
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
                    Adresse Email
                </label>

                <div className="mt-[10px]">
                    <input 
                        placeholder="Adresse Email" 
                        type="mail"
                        value={utilisateurs_adresse_email} 
                        onChange={handleChangeEmail}
                        className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-[16px] font-medium text-gray-900">
                    Mot de passe
                </label>

                <div className="mt-[10px]">
                    <input 
                        placeholder="Mot de passe" 
                        type="password" 
                        value={utilisateurs_mot_de_passe} 
                        onChange={handleChangePassword}
                        className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                        required
                    />
                </div>
            </div>
        </>
    )
}

export default ChampConnexion 