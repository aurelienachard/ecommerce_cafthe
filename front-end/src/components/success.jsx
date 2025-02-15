const Success = () => {
    return(
        <div className="flex flex-col items-center justify-center bg-gray-100 text-center px-6 py-12">
            
            <div className="max-w-md bg-white shadow-lg rounded-lg p-8">

                <h1 className="text-[20px] font-semibold text-gray-800 mb-[20px]">
                    Merci pour votre commande
                </h1>

                <p className="mb-[10px]">
                    Nous vous remercions de votre confiance !
                </p>
                
                <p>
                    Si vous avez des questions, veuillez envoyer un courriel à 
                    <a href="mailto:contact@cafthe.com" className="text-green-principale"> contact@cafthe.com</a>
                </p>
           
            </div>
        </div>
    )
}

export default Success