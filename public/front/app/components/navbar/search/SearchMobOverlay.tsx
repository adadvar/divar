"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_SEARCH_MOB } from "@/public/utils";

const SearchMobOverlay = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );

    const dispatch = useDispatch();
    return (
        <>
            {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_SEARCH_MOB && (
                <div
                    className={`w-full h-[calc(100vh_-_66px)] absolute bottom-0 bg-white overflow-auto z-50`}
                ></div>
            )}
        </>
    );
};

export default SearchMobOverlay;
