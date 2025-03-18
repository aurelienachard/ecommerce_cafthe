import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Catalogue from "./pages/catalogue"
import Produit from "./pages/produit"
import Inscription from './pages/inscription'
import Connexion from './pages/connexion'
import Profile from "./pages/profile"
import Panier from "./pages/panier"
import Fortgetpwd from './pages/forgetpwd'
import CGU from './pages/cgu'
import CGV from './pages/cgv'
import PostalConfig from './pages/postalconfig'
import ProfileConfig from './pages/profileconfig'
import ProfilCommande from './pages/profileCommande'
import Success from './pages/success'
import Cancel from './pages/cancel'
import StorePayement from './pages/storePayment'
import RGPD from './pages/rgpd'

import Header from './components/header'
import Footer from './components/footer'

import './style.css'

const App = () => {
  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return token && token.length > 0
  }

  return (
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Catalogue />} />
          <Route path="/produits" element={<Catalogue />} />
          <Route path="/produits/:produit_id" element={<Produit />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/connexion" />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/fortgetpwd" element={<Fortgetpwd />} />
          <Route path="/CGU" element={<CGU />} />
          <Route path="/CGV" element={<CGV />} />
          <Route path="/postalconfig" element={isAuthenticated() ? <PostalConfig /> : <Navigate to="/connexion" />} />
          <Route path="/profileconfig" element={isAuthenticated() ? <ProfileConfig /> : <Navigate to="/connexion" />} />
          <Route path="/commande" element={isAuthenticated() ? <ProfilCommande /> : <Navigate to="/connexion" />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/successStore" element={<StorePayement />} />
          <Route path="/RGPD" element={<RGPD />} />
        </Routes>

        <Footer />
      </Router>
  )
}

export default App