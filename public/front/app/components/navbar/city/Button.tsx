"use client";

import { DIALOG_TYPE_CITY } from "@/public/utils";
import { BiMap as LocationIcon } from "react-icons/bi";
import { useGlobal } from "@/app/store/global-store";

interface Props {
    text: string;
}

const Button = ({ text }: Props) => {
    const setTypeDialog = useGlobal.getState().setTypeDialog;

    return (
        <>
            <button
                className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
                onClick={() => setTypeDialog(DIALOG_TYPE_CITY)}
            >
                <div className="text-xl">
                    <LocationIcon />
                </div>
                <span className="text-xs">{text}</span>
            </button>
        </>
    );
};

export default Button;
