import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Accueil from "./pages/accueil"
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

import Header from './components/header'
import Footer from './components/footer'

import './style.css'

const App = () => {
  return (
      <Router>
        <Header />

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

        <Footer />
      </Router>
  )
}

export default App