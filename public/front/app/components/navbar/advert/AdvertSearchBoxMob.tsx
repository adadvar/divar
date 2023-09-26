"use client";

import { BiSearch as SearchIcon, BiMap as LocationIcon } from "react-icons/bi";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_SEARCH_MOB } from "@/public/utils";
import Divider from "@/app/components/Divider";
import SearchMobOverlay from "./AdvertSearchMobOverlay";

const SearchBoxMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <form className="relative w-full">
            <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_SEARCH_MOB}
            <div
                id="category-search"
                className="block p-2 ps-8 text-sm w-full text-gray-400 bg-gray-100 outline-none rounded-lg focus:rounded-none focus:rounded-t-lg focus:border-b focus:shadow-md focus:bg-white"
                onClick={() => dispatch(openDialog(DIALOG_TYPE_SEARCH_MOB))}
            >
                جستجو در همه آگهی ها
            </div>
            <div className="absolute inset-y-0 end-2 flex items-center pointer-events-none">
                <Divider direction="vertical" style="me-3 text-gray-300" />
                <p className="text-sm me-1 text-gray-400 font-semibold">
                    تبریز
                </p>
                <LocationIcon />
            </div>
        </form>
    );
};

export default SearchBoxMob;
