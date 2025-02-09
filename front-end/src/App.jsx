import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Accueil from "./components/accueil"
import Catalogue from "./components/catalogue"
import Produit from "./components/produit"
import Inscription from './components/inscription'
import Connexion from './components/connexion'
import Profile from "./components/profile"
import Panier from "./components/panier"

import './style.css'

const App = () => {
  const [user, setUser] = useState(null)

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
  }
  
  return (
    <Router>
      <div className="flex bg-green-principale justify-center">
        <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/">Accueil</Link>
        <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/produits">Produits</Link>
        <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/panier">Panier</Link>
        {user ? (
          <>
            <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/profile">Profile</Link>
            <button className="border mx-[24px] my-[24px] bg-green-principale text-white py-[12px] px-[16px]" onClick={handleDeconnexion}>Deconnexion</button>
          </>
        ) : (
          <>
            <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/connexion">Connexion</Link>
            <Link className="border mx-[24px] my-[24px] text-white py-[12px] px-[16px]" to="/inscription">Inscription</Link>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/produits" element={<Catalogue />}></Route>
        <Route path="/produits/:produit_id" element={<Produit />}></Route>
        {/* on definit le props avec setUser */}
        <Route path="/connexion" element={<Connexion />}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/panier" element={<Panier />}></Route>
      </Routes>
    </Router>
  )
}

export default App