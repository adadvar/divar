"use client";
import { useRef, useEffect } from "react";
import {
    BiSearch as SearchIcon,
    BiMap as LocationIcon,
    BiRightArrowAlt as RightIcon,
} from "react-icons/bi";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector, useDispatch } from "react-redux";
import {
    closeDialog,
    openDialog,
} from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_CITY_MOB, DIALOG_TYPE_SEARCH_MOB } from "@/public/utils";
import Divider from "@/app/components/Divider";

const InputBoxMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <button
                className="absolute inset-y-0 end-2 flex items-center"
                onClick={() => dispatch(openDialog(DIALOG_TYPE_CITY_MOB))}
            >
                <Divider direction="vertical" style="me-3 text-gray-300" />
                <p className="text-sm me-1 text-gray-400 font-semibold">
                    تبریز
                </p>
                <LocationIcon />
            </button>
            <div
                id="category-search"
                className="block p-2 ps-8 text-sm w-full text-gray-400 bg-gray-100 outline-none rounded-lg focus:rounded-none focus:rounded-t-lg focus:border-b focus:shadow-md focus:bg-white"
                onClick={() => dispatch(openDialog(DIALOG_TYPE_SEARCH_MOB))}
            >
                جستجو در همه آگهی ها
            </div>
        </div>
    );
};

export default InputBoxMob;
