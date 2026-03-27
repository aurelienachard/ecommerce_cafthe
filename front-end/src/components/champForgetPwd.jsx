const ChampForgetPwd = ({
    utilisateurs_adresse_email,
    oldPassword,
    newPassword,
    handleChangeEmail,
    handleChangeOldPassword,
    handleChangeNewPassword,
    message
}) => {
    return (
        <>
            <div>
                <label>
                    Adresse Email
                </label>

                <div className="mt-[10px]">
                    <input
                        onChange={handleChangeEmail}
                        value={utilisateurs_adresse_email}
                        placeholder="Adresse Email"
                        type="mail"
                        className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                        required
                    />
                </div>
            </div>

            <div>
                <label>
                    Ancien Mot de passe
                </label>

                <div className="mt-[10px]">
                    <input
                        onChange={handleChangeOldPassword}
                        value={oldPassword}
                        placeholder="Ancien Mot de passe"
                        type="password"
                        className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                        required
                    />
                </div>
            </div>

            <div>
                <label>
                    Nouveau mot de passe
                </label>

                <div className="mt-[10px]">
                    <input
                        onChange={handleChangeNewPassword}
                        value={newPassword}
                        placeholder="Nouveau mot de passe"
                        type="password"
                        className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                        required
                    />
                </div>
            </div>

            {message && <p>{message}</p>}
        </>
    )
}

export default ChampForgetPwd 