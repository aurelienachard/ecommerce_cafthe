import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
    const token = localStorage.getItem('token')
    // on recupere le token
    if (token) {
        setUser(true)
    }
    }, [])

    const handleDeconnexion = () => {
        localStorage.removeItem('token')
        setUser(false)
        navigate('/produits')
    }

    return (
        <header className="bg-green-700 text-white p-[24px] text-center shadow-sm">
            <Link to="/">Accueil</Link>
            <Link to="/produits">Produits</Link>
            <Link to="/panier">Panier</Link>
            {user ? (
                <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleDeconnexion}>Deconnexion</button>
                </>
            ) : (
                <>
                    <Link to="/inscription">Inscription</Link>
                    <Link to="/connexion">Connexion</Link>
                </>
            )}
        </header>
    )
}

export default Header