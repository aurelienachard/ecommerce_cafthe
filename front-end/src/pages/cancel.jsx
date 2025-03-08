import { useNavigate } from "react-router-dom"

const Cancel = () => {
    const navigate = useNavigate()

    const redirectPage = () => {
        navigate('/produits')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6 py-12">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Paiement annulé
                </h1>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        Nous avons bien pris en compte l&apos;annulation de votre commande.
                    </p>
                    
                    <p className="text-gray-600">
                        Si vous avez changé d&apos;avis, vous pouvez reprendre votre commande en cliquant sur le bouton ci-dessous.
                    </p>

                    <button 
                        onClick={redirectPage} 
                        className="mt-6 w-full bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium"
                    >
                        Retourner aux produits
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cancel;
