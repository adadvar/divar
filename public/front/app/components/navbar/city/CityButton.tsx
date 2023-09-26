"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { DIALOG_TYPE_CITY } from "@/public/utils";
import { BiMap as LocationIcon } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import CitySelectOverlay from "./CitySelectOverlay";

interface Props {
    text: string;
}

const CityButton = ({ text }: Props) => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <>
            <button
                className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
                onClick={() => dispatch(openDialog(DIALOG_TYPE_CITY))}
            >
                <div className="text-xl">
                    <LocationIcon />
                </div>
                <span className="text-xs">{text}</span>
            </button>
        </>
    );
};

export default CityButton;
