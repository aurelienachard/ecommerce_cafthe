import {useState, useEffect} from 'react'
import axios from 'axios'

const ProfilCommande = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3001/orders', {
            headers: {
                'Authorization': `Bearer ${token}`  
            }
        })
        .then((response) => {
            setOrders(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <div className="p-[24px]"> 
            <h1 className="font-bold mb-[20px] text-gray-800">Mes Commandes</h1>

            {orders.length === 0 ? (
                <p>Vous n&apos;avez pas encore de commandes.</p>
            ) : (
                <div>
                    {orders.map((order) => {
                        const products = order.product_details
                        const totalPrix = products.reduce((sum, product) => sum + (product.prix * product.quantite), 0)

                        return (
                            <div key={order.order_id} className='border p-[24px] rounded-md shadow-md mt-[20px]'>
                                <div>
                                    <div className="mb-[20px]">
                                        <div className='flex justify-between'>
                                            <p>Commande #{order.orders_id}</p>
                                            <p className="py-[12px] px-[16px] bg-orange-300 rounded-md">Status: {order.order_status}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {products.map((product, index) => (
                                        <div key={index} className='flex justify-between'>
                                            <div className='flex'>
                                                <p className='mr-[60px]'>{product.nom}</p>
                                                <p>Quantité: {product.quantite}</p>
                                            </div>
                                            <p>{product.prix}€</p>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className='border mt-[20px] mb-[20px]'></div>

                                <div className='flex justify-between'>
                                    <p>Total</p>
                                    <p>{totalPrix.toFixed(2)}€</p>
                                </div>

                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ProfilCommande