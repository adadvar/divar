"use client";

import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import {
    DIALOG_TYPE_CATEGORY,
    DIALOG_TYPE_CITY,
    DIALOG_TYPE_SEARCH,
    DIALOG_TYPE_SEARCH_MOB,
} from "@/public/utils";
import { RootState } from "@/app/GlobalRedux/store";
import CitySelectOverlay from "./navbar/city/CitySelectOverlay";
import SearchMobOverlay from "./navbar/advert/AdvertSearchMobOverlay";

interface Props {
    typeOpenDialog: string;
}

const Overlay = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );

    const dispatch = useDispatch();

    const handleHeight = () => {
        switch (typeOpenDialog) {
            case DIALOG_TYPE_SEARCH:
            case DIALOG_TYPE_CATEGORY:
                return 66;

            case DIALOG_TYPE_CITY:
                return 0;

            default:
                return 0;
        }
    };

    const height = handleHeight();

    return (
        <>
            {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_SEARCH_MOB && (
                <SearchMobOverlay />
            )}
            {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_CITY && (
                <CitySelectOverlay />
            )}
            {typeOpenDialog && typeOpenDialog != DIALOG_TYPE_SEARCH_MOB && (
                <div
                    className={`w-full h-[calc(100vh_-_66px)] absolute bottom-0 bg-black ${
                        typeOpenDialog ? "opacity-30" : "opacity-0"
                    } overflow-auto transition duration-300 ease-in-out`}
                    onClick={() => dispatch(closeDialog())}
                ></div>
            )}
        </>
    );
};

export default Overlay;
