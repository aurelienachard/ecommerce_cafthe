const Recherche = ({ search }) => {
    
    const handleSearch = (event) => {
        search(event.target.value)
    }

    return (
        <input 
            className="mt-[32px] w-full text-[16px] outline-1 -outline-offset-1 outline-gray-300 block rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]" 
            placeholder="Rechercher un produit" 
            onChange={handleSearch}
        />
    )
}

export default Recherche 