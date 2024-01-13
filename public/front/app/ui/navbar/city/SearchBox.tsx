import { BiSearch as SearchIcon } from "react-icons/bi";
import { useState } from "react";
import { city } from "@/public/interfaces";
import { useGlobal, useTmp } from "@/app/store/global-store";

const CitySearchBox = ({
    items,
    setFilteredItems,
}: {
    items: city[];
    setFilteredItems: (c: city[]) => void;
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { parentCityId } = useTmp();

    const handleSearch = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);
        let filtered = [];
        if (parentCityId) {
            filtered = items.filter((item) => item.name.includes(query));
        } else {
            const subCities: any =
                parentCityId &&
                items.filter((c: any) => c.id === parentCityId)[0];
            filtered = subCities.filter((item: any) =>
                item.name.includes(query)
            );
        }
        setFilteredItems(filtered);
    };

    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input
                type="search"
                id="category-search"
                className="block w-full p-2 ps-7 text-sm text-gray-900 bg-white border focus:outline-none  focus:border-red-700 rounded-lg"
                placeholder="جستجو در شهرها"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default CitySearchBox;
