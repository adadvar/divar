import CityItems from "./Navbar/CityItems";
import SearchBoxCity from "./Navbar/SearchBoxCity";

const SelectCityBox = () => {
    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3 z-50">
            <div className="flex flex-col gap-5 py-8 overflow-hidden h-full">
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                        <button className="text-red-900 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    </div>
                    <SearchBoxCity />
                </div>
                <div className="h-1 left-0 right-0 shadow-sm"></div>
                <CityItems />
            </div>
        </div>
    );
};

export default SelectCityBox;
