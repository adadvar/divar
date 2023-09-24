import SearchBoxCity from "./Navbar/SearchBoxCity";

const SelectCityBox = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3">
            <div className="flex flex-col">
                <div className="flex justify-between px-10 py-8">
                    <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                    <button className="text-red-900 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                        حذف همه
                    </button>
                </div>
                <SearchBoxCity />
            </div>
        </div>
    );
};

export default SelectCityBox;
