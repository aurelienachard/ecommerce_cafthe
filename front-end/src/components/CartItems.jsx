import { XMarkIcon } from '@heroicons/react/20/solid'

const CartItems = ({ panier, augmenterArticle, diminuerArticle, supprimerArticle }) => {
    return (
        <div className="flex-1">
            <div className="border-t border-b border-gray-200">
                {panier.map(item => 
                    <div key={item.id} className="flex py-[24px] sm:py-[40px]">
                        <div className="shrink-0">
                            <img src="./image.jpg"
                                alt={item.nom}
                                className="size-24 rounded-md object-cover sm:size-48"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                    <div className="flex justify-between">
                                        <h3 className="text-sm">
                                            <span className="font-medium text-gray-700 hover:text-gray-800">
                                                {item.nom}
                                            </span>
                                        </h3>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.quantiteGramme}</p>
                                    <p className="mt-1 text-sm font-medium text-gray-900">${item.prix}</p>
                                </div>

                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                    <div className="flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => diminuerArticle(item.id, item.quantiteGramme)}
                                            className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm border hover:bg-gray-50">
                                            -
                                        </button>

                                        <p className="text-sm text-gray-900">{item.quantite}</p>

                                        <button
                                            type="button"
                                            onClick={() => augmenterArticle(item.id, item.quantiteGramme)}
                                            className="rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm border hover:bg-gray-50">
                                            +
                                        </button>
                                    </div>

                                    <div className="absolute right-0 top-0">
                                        <button
                                            type="button" 
                                            onClick={() => supprimerArticle(item.id, item.quantiteGramme)}
                                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Supprimer</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartItems 