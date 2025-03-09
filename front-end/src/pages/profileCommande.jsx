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
                            {orders.map((order) => {
                                const products = order.product_details
                                const totalPrix = products.reduce((sum, product) => sum + (product.prix * product.quantite), 0)

                                return (
                                    <div key={order.order_id}>
                                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                            <dl className="flex-auto divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                                                    <dt className="font-medium text-gray-900">Numéro de commande</dt>
                                                    <dd className="sm:mt-1">#{order.orders_id}</dd>
                                                </div>
                                                <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                                                    <dt className="font-medium text-gray-900">Status</dt>
                                                    <dd className="sm:mt-1">
                                                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                                            {order.order_status}
                                                        </span>
                                                    </dd>
                                                </div>
                                                <div className="max-sm:flex max-sm:justify-between max-sm:py-6 max-sm:first:pt-0 max-sm:last:pb-0">
                                                    <dt className="font-medium text-gray-900">Montant total</dt>
                                                    <dd className="font-medium text-gray-900 sm:mt-1">{totalPrix.toFixed(2)}€</dd>
                                                </div>
                                            </dl>
                                        </div>

                                        <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                            <caption className="sr-only">Produits</caption>
                                            <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                                <tr>
                                                    <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                                        Produit
                                                    </th>
                                                    <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                                        Prix unitaire
                                                    </th>
                                                    <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                        Quantité
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                                {products.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className="py-6 pr-8">
                                                            <div className="flex items-center">
                                                                <div>
                                                                    <div className="font-medium text-gray-900">{product.nom}</div>
                                                                    <div className="mt-1 sm:hidden">{product.prix}€</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="hidden py-6 pr-8 sm:table-cell">{product.prix}€</td>
                                                        <td className="hidden py-6 pr-8 sm:table-cell">{product.quantite}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilCommande