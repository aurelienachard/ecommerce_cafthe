import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StorePayement = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        localStorage.removeItem('cart');
    }, []);

    const redirectPage = () => {
        navigate('/produits')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6 py-12">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-green-principale" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Commande enregistrée
                </h1>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        Nous vous remercions de votre confiance ! Votre commande a été enregistrée pour paiement en magasin.
                    </p>
                    
                    <p className="text-gray-600">
                        Vous recevrez un message quand votre commande sera prête.
                    </p>
                    
                    <p className="text-gray-600">
                        Pour toute question, contactez-nous à 
                        <a href="mailto:contact@cafthe.com" className="text-green-principale hover:text-green-700 font-medium"> contact@cafthe.com</a>
                    </p>

                    <button 
                        onClick={redirectPage} 
                        className="mt-6 w-full bg-emerald-500 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-medium"
                    >
                        Retourner aux produits
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StorePayement