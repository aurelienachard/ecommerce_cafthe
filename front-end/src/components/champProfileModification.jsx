const ChampProfileModification = ({ label, value, onChange, placeholder, type }) => {
    return (
        <div>
            <label className="block text-[16px] font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-[10px]">
                <input 
                    value={value} 
                    onChange={onChange} 
                    placeholder={placeholder} 
                    type={type} 
                    className="text-[16px] outline-1 -outline-offset-1 outline-gray-300 block w-full rounded-md px-[12px] py-[16px] bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-600 sm:text-[14px]"
                />
            </div>
        </div>
    )
}

export default ChampProfileModification 