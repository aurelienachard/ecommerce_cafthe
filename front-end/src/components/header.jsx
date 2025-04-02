import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Dialog } from '@headlessui/react'

const Header = () => {
    const [user, setUser] = useState(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
    const token = localStorage.getItem('token')
    // on recupere le token
    if (token) {
        setUser(true)
    }
    }, [])

    const handleDeconnexion = () => {
        localStorage.removeItem('token')
        setUser(false)
        navigate('/produits')
    }

    return (
        <header className="bg-emerald-800">
            <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-[24px] p-[24px] lg:px-[32px]">
                <div className="flex lg:flex-1">
                    <Link to="/">
                        <p className="text-white font-[inter] font-bold text-[32px]">CAFTHE</p>
                    </Link>
                </div>

                <div className="hidden lg:flex lg:gap-x-[48px]">
                    <Link to="/produits" className="text-base font-semibold text-white font-[inter]">
                        Produits
                    </Link>

                    <Link to="/panier" className="text-base font-semibold text-white font-[inter]">
                        Panier
                    </Link>
                </div>

                <div className="flex flex-1 items-center justify-end gap-x-[24px]">
                    {user ? (
                        <>
                            <Link 
                                to="/profile"
                                className="hidden lg:block text-base font-semibold text-white font-[inter]">
                                Profile
                            </Link>

                            <button
                                onClick={handleDeconnexion}
                                className="rounded-md bg-emerald-600 px-[16px] py-[12px] text-base font-semibold text-white font-[inter] shadow-sm hover:bg-emerald-500 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                                Deconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/connexion"
                                className="hidden lg:block text-base font-semibold text-white font-[inter]">
                                Connexion
                            </Link>

                            <Link
                                to="/inscription"
                                className="rounded-md bg-emerald-600 px-[16px] py-[12px] text-base font-semibold text-white font-[inter] shadow-sm hover:bg-emerald-500 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                                Inscription
                            </Link>
                        </>
                    )}
                </div>

                {/* Menu mobile button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white font-[inter]"
                    >
                        <span className="sr-only">Ouvrir le menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-black/30" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-emerald-800 px-6 py-6 sm:max-w-sm">
                    <div className="flex items-center gap-x-6">
                        {user ? (
                            <button
                                onClick={handleDeconnexion}
                                className="ml-auto rounded-md bg-emerald-600 px-[16px] py-[12px] text-base font-semibold text-white font-[inter] shadow-sm hover:bg-emerald-500 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Deconnexion
                            </button>
                        ) : (
                            <Link
                                to="/inscription"
                                className="ml-auto rounded-md bg-emerald-600 px-[16px] py-[12px] text-base font-semibold text-white font-[inter] shadow-sm hover:bg-emerald-500 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Inscription
                            </Link>
                        )}
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white font-[inter] hover:text-emerald-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Fermer le menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="mt-6 flow-root">
                        <div className="-my-6">
                            <div className="space-y-2 py-6">
                                <Link
                                    to="/produits"
                                    className="-mx-3 block rounded-lg px-[16px] py-[12px] text-base font-semibold text-white font-[inter] hover:bg-emerald-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Produits
                                </Link>
                                <Link
                                    to="/panier"
                                    className="-mx-3 block rounded-lg px-[16px] py-[12px] text-base font-semibold text-white font-[inter] hover:bg-emerald-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Panier
                                </Link>
                                {user && (
                                    <Link
                                        to="/profile"
                                        className="-mx-3 block rounded-lg px-[16px] py-[12px] text-base font-semibold text-white font-[inter] hover:bg-emerald-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                )}
                            </div>
                            {!user && (
                                <div className="py-6">
                                    <Link
                                        to="/connexion"
                                        className="-mx-3 block rounded-lg px-[16px] py-[12px] text-base font-semibold text-white font-[inter] hover:bg-emerald-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Connexion
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Header