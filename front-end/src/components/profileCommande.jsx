import { useEffect, useState } from "react"
import axios from 'axios'

const ProfilCommande = () => {
    const [commande, setCommande] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')

        axios.get("http://localhost:3001/orders", {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(response => {
            setCommande(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div>
            <h1>Commandes</h1>

            {commande.map(order => {
                <div>
                    <p>Order ID: {order.orders_id}</p>
                    <p>Status: {order.order_status}</p>
                    <p>Products: {JSON.stringify(order.product_details)}</p> 
                    {/* on demande a afficher les produits au format json */}
                </div>
            })}

        </div>
    )
}

export default ProfilCommande