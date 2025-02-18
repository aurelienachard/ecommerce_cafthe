import { useEffect } from "react"
import axios from 'axios'

const ProfilCommande = () => {
    // const [commande, setCommande] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        axios.get("http://localhost:3001/orders", {
            headers: {
                'Authorization' : `Bearer ${token}`, // on veut le token
                'Content-Type' : 'application/json', // on veut le format json
            }
        })
        .then(response => {
            console.log(response.data); // Ajoutez ceci pour vérifier la structure de la réponse
            // setCommande(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div className="p-[16px]">
            <h1 className="font-bold text-[32px] mb-[20px]">Commandes</h1>
            {/* {commande.map(order => (
                <div key={order.orders_id}>
                    <p>OrderID: {order.orders_id}</p>
                    <p>Status: {order.order_status}</p>
                </div>
            ))} */}
        </div>
    )
}

export default ProfilCommande