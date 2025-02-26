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
      <div className="border bg-green-principale p-[32px] flex justify-center">
        <Link className="font-bold mx-[10px] px-[16px] py-[12px] text-white" to="/">Accueil</Link>
        <Link className="font-bold mx-[10px] px-[16px] py-[12px] text-white" to="/produits">Produits</Link>
        <Link className="font-bold mx-[10px] px-[16px] py-[12px] text-white" to="/panier">Panier</Link>
        {user ? (
          <>
            <Link className="font-bold mx-[10px] px-[16px] py-[12px] text-white" to="/profile">Profile</Link>
            <button className="font-bold px-[16px] py-[12px] text-white mx-[10px]" onClick={handleDeconnexion}>Deconnexion</button>
          </>
        ) : (
          <>
            <Link className="font-bold px-[16px] py-[12px] text-white mx-[10px]" to="/inscription">Inscription</Link>
            <Link className="font-bold px-[16px] py-[12px] text-white mx-[10px]" to="/connexion">Connexion</Link>
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
      
      <footer className="bg-black-footer text-white p-[32px]">
        <h2 className="font-bold text-[24px] mb-[10px]">CAFTHE</h2>
        <p className="w-[500px]">Votre entreprise qui est spécialisée dans la vente de thés et de cafés haut de gamme, provenant des 4 coins du monde.</p>
        
        <div className="border my-[20px]"></div>

        <div className="flex justify-between">
          {/* Localisation */}
          <div>
            <h2 className="text-[18px] font-bold mb-[10px]">COORDONNÉES</h2>

            <div className="flex mt-[20px] items-center">
              <img src="pin.png" className="w-[28px] mr-[10px]" alt="icone" />
              <p>69 Rue du Commerce, 41000 Blois</p>
            </div>

            <div className="flex my-[20px] items-center">
              <img src="phone-call.png" className="w-[28px] mr-[10px]" alt="icone" />
              <p>+33 02 42 42 42 42</p>
            </div>

            <div className="flex items-center">
              <img src="email.png" className="w-[28px] mr-[10px]" alt="icone" />
              <p>contact@cafthe.fr</p>
            </div>
          </div>

          {/* Liens vers les produits */}
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold mb-[10px]">PAGES</h2>
            <Link className="mb-[10px]" to="#">Produits</Link>
            <Link className="mb-[10px]" to="#">Accessoires</Link>
            <Link className="mb-[10px]" to="#">Blog</Link>
          </div>

          {/* Liens vers le support */}
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold mb-[10px]">SUPPORT</h2>
            <Link className="mb-[10px]" to="#">Contact US</Link>
            <Link className="mb-[10px]" to="#">FAQs</Link>
            <Link className="mb-[10px]" to="#">Shipping Options</Link>
          </div>
        </div>

        <div className="border my-[20px]"></div>

        {/* Informations utiles */}
        <div className="flex justify-between">
          <div>
            <p>&copy; 2025 Cafthe. Tous droits réservés.</p>
          </div>

          <div className='flex'>
            <Link to="/CGU">Conditions Générales Utilisation</Link>
            <p className="mx-[10px]">|</p>
            <Link to="/CGV">Conditions Générales de Vente</Link>
          </div>
        </div>
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