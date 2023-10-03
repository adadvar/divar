"use client";

import { BiSearch as SearchIcon } from "react-icons/bi";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";

const SearchBox = () => {
    const dispatch = useDispatch();

    return (
        <form>
            <div className="relative">
                <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input
                    type="search"
                    id="category-search"
                    className="block w-full p-2 text-sm text-gray-900 bg-white border focus:outline-none focus:border-2 focus:border-red-700 rounded-lg"
                    placeholder="جستجو در شهرها"
                />
            </div>
        </form>
    );
};

export default SearchBox;
