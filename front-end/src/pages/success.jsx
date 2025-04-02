import { useEffect } from "react"

const Success = () => {
    useEffect(() => {
        localStorage.removeItem('cart');
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6 py-12">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8">
                <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-green-principale" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Merci pour votre commande
                </h1>

                <div className="space-y-4">
                    <p className="text-gray-600">
                        Nous vous remercions de votre confiance ! Votre commande a été enregistrée avec succès.
                    </p>
                    
                    <p className="text-gray-600">
                        Un email de confirmation vous sera envoyé dans quelques instants.
                    </p>
                    
                    <p className="text-gray-600">
                        Pour toute question, contactez-nous à 
                        <a href="mailto:contact@cafthe.com" className="text-green-principale hover:text-green-700 font-medium"> contact@cafthe.com</a>
                    </p>
                </div>
           
            </div>
        </div>
    )
}

export default Success