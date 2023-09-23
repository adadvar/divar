"use client";

import { BiSearch as SearchIcon } from "react-icons/bi";
import { RootState } from "../GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
    openSearch,
    closeSearch,
} from "../GlobalRedux/features/global/globalSlice";
import SearchItems from "./SearchItems";

const SearchInput = () => {
    const isSearchOpen = useSelector(
        (state: RootState) => state.global.isSearchOpen
    );
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
                    className="block xl:w-[28rem] md:w-[20rem] w-[12rem] p-2 ps-8 text-sm text-gray-900 bg-gray-100 outline-none rounded-lg focus:rounded-none focus:rounded-t-lg focus:border-b focus:shadow-md focus:bg-transparent"
                    placeholder="جستجو در همه آگهی ها"
                    onClick={() => dispatch(openSearch())}
                />
                {isSearchOpen && (
                    <div className="absolute left-0 right-0">
                        <SearchItems />
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchInput;
