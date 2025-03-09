import {useState, useEffect} from 'react'
import axios from 'axios'
import CommandeClient from '../components/commandeClient'

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
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
                <div className="max-w-xl">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Mes Commandes</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Consultez l&apos;état de vos commandes récentes et gérez vos retours.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <p className="mt-16">Vous n&apos;avez pas encore de commandes.</p>
                ) : (
                    <div className="mt-16">
                        <h2 className="sr-only">Commandes récentes</h2>
                        <div className="space-y-20">
                            {orders.map((order) => (
                                <CommandeClient key={order.order_id} order={order} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilCommande