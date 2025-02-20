import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'

import Accueil from "./components/accueil"
import Catalogue from "./components/catalogue"
import Produit from "./components/produit"
import Inscription from './components/inscription'
import Connexion from './components/connexion'
import Profile from "./components/profile"
import Panier from "./components/panier"
import Fortgetpwd from './components/forgetpwd'
import CGU from './components/cgu'
import CGV from './components/cgv'
import PostalConfig from './components/postalconfig'
import ProfileConfig from './components/profileconfig'
import ProfilCommande from './components/profileCommande'
import Success from './components/success'
import Cancel from './components/cancel'
import StorePayement from './components/storePayment'

import './style.css'


const AppSecond = () => {
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
    <>
      <div className="flex bg-green-principale justify-center">
        <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/">Accueil</Link>
        <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/produits">Produits</Link>
        <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/panier">Panier</Link>
        {user ? (
          <>
            <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/profile">Profile</Link>
            <button className="mx-[32px] my-[32px] bg-green-principale text-white py-[12px] px-[16px]" onClick={handleDeconnexion}>Deconnexion</button>
          </>
        ) : (
          <>
            <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/connexion">Connexion</Link>
            <Link className="mx-[32px] my-[32px] text-white py-[12px] px-[16px]" to="/inscription">Inscription</Link>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/produits" element={<Catalogue />}></Route>
        <Route path="/produits/:produit_id" element={<Produit />}></Route>
        <Route path="/connexion" element={<Connexion />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/panier" element={<Panier />}></Route>
        <Route path="/fortgetpwd" element={<Fortgetpwd />}></Route>
        <Route path="/CGU" element={<CGU />}></Route>
        <Route path="/CGV" element={<CGV />}></Route>
        <Route path="/postalconfig" element={<PostalConfig />}></Route>
        <Route path="/profileconfig" element={<ProfileConfig />}></Route>
        <Route path="/commande" element={<ProfilCommande />}></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="/cancel" element={<Cancel />}></Route>
        <Route path="/successStore" element={<StorePayement />}></Route>
      </Routes>
      
      <footer className="bg-gray-700 flex justify-center items-center">
        <Link to="/CGU" className="text-white">CGU</Link>
        <Link to="/CGV" className="text-white ml-[20px]">CGV</Link>
        <p className="text-white p-[20px]">&copy; 2025 Cafthe - Tous droits réservés</p>
      </footer>
    </>
  )
}

/*

  on doit utiliser useNavigate doit etre utilise a l'interieur d'un composant qui est enfant direct d'un composant router
  Cela se produit généralement lorsque le composant qui utilise useNavigate est rendu en dehors du contexte d'un <Router>
  
*/

const App = () => {
  return (
    <Router>
      <AppSecond />
    </Router>
  )
}

export default App