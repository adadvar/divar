"use client";

import { BiSearch as SearchIcon } from "react-icons/bi";

const SearchBox = () => {
    return (
        <form className="relative w-full">
            <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input
                type="search"
                id="category-search"
                className="block w-full p-2 ps-7 text-sm text-gray-900 bg-white border focus:outline-none  focus:border-red-700 rounded-lg"
                placeholder="جستجو در شهرها"
            />
        </form>
    );
};

export default SearchBox;
