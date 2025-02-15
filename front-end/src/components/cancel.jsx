import { useNavigate } from "react-router-dom"

const Cancel = () => {
    const navigate = useNavigate()

    const redirectPage = () => {
        navigate('/produits')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6 py-12">
            <div className="max-w-md bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-[20px] font-semibold text-gray-800 mb-[20px]">Paiement annulé</h1>
                <p className="mb-[10px]">Nous avons bien pris en compte lannulation de votre commande.</p>
                <p> Si vous avez changé davis, vous pouvez reprendre votre commande en cliquant sur le bouton ci-dessous.</p>
                <button onClick={redirectPage} className="mt-6 bg-green-principale text-white py-2 px-6 rounded-lg">Revenir a la page</button>
            </div>
        </div>
    )
}

export default Cancel;
