import { Link } from "react-router-dom"

const Profile = () => {
    return (
        <div className="p-[24px]">
            <h1 className="text-[32px] font-bold">Profile</h1>

            <div className="flex flex-col">
                <Link to="/fortgetpwd" className=" mt-[16px] text-green-principale">Modifier son mot de passe</Link>
                <Link to="/profileconfig" className=" mt-[16px] text-green-principale">Modifier son profil</Link>
                <Link to="/postalconfig" className=" mt-[16px] text-green-principale">Modifier son adresse postal</Link>
            </div>
        </div>
    )
}

export default Profile