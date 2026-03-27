const Filtre = ({ handleCategory, activeBouton }) => {
    return (
        <div className="w-full lg:w-[256px]">
            <div className="top-[16px]">
                <p className="text-[16px] font-medium text-gray-900 pb-[16px]">Filtre</p>

                <div className="mt-[16px] space-y-4">
                    <button
                        onClick={() => handleCategory('')}
                        className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                            ${activeBouton === '' 
                            ? 'bg-emerald-700 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => handleCategory('cafe')}
                        className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                            ${activeBouton === 'cafe' 
                            ? 'bg-emerald-700 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Café
                    </button>
                    
                    <button
                        onClick={() => handleCategory('the')}
                        className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                            ${activeBouton === 'the'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Thé
                    </button>
                    
                    <button
                        onClick={() => handleCategory('accessoires')}
                        className={`w-full px-[16px] py-[8px] text-left rounded-md transition-colors duration-200 
                            ${activeBouton === 'accessoires'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        Accessoires
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filtre 