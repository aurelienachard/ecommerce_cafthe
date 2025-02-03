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
    const token = window.localStorage.getItem('token')
    // on recupe le token
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

      <div className="flex bg-green-600 justify-center p-[20px]">
        <Link className="p-[16px] m-[8px] hover:text-white" to="/">Accueil</Link>
        <Link className="p-[16px] m-[8px] hover:text-white" to="/produits">Produits</Link>
        <Link className="p-[16px] m-[8px] hover:text-white" to="/panier">Panier</Link>
        {user ? (
          <>
            <Link className="p-[16px] m-[8px] hover:text-white" to="/profile">Profile</Link>
            <button className="bg-green-900 hover:bg-green-950 text-white p-[16px]" onClick={handleDeconnexion}>Deconnexion</button>
          </>
        ) : (
          <>
            <Link className="p-[16px] m-[8px] hover:text-white" to="/connexion">Connexion</Link>
            <Link className="p-[16px] m-[8px] hover:text-white" to="/inscription">Inscription</Link>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Accueil />}></Route>
        <Route path="/produits" element={<Catalogue />}></Route>
        <Route path="/produits/:produit_id" element={<Produit />}></Route>
        {/* on definit le props avec setUser */}
        <Route path="/connexion" element={<Connexion setUser={setUser}/>}></Route>
        <Route path="/inscription" element={<Inscription />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/panier" element={<Panier />}></Route>
      </Routes>
    </Router>
  )
}

export default App