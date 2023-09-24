"use client";

import { BiSearch as SearchIcon } from "react-icons/bi";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import SearchItems from "./SearchItems";
import { DIALOG_TYPE_SEARCH } from "@/public/utils";

const SearchInput = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
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
                    className="block xl:w-[28rem] md:w-[20rem] w-[12rem] p-2 ps-8 text-sm text-gray-900 bg-gray-100 outline-none rounded-lg focus:rounded-none focus:rounded-t-lg focus:border-b focus:shadow-md focus:bg-white"
                    placeholder="جستجو در همه آگهی ها"
                    onClick={() => dispatch(openDialog(DIALOG_TYPE_SEARCH))}
                />
                {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_SEARCH && (
                    <div className="absolute left-0 right-0">
                        <SearchItems />
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchInput;
