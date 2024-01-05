"use client";

import { useGlobal } from "@/app/store/global-store";
import { DIALOG_TYPE_CITY } from "@/public/utils";
import { BiMap as LocationIcon } from "react-icons/bi";

const Button = () => {
    const { typeDialog, selectedCities, setTypeDialog } = useGlobal();
    const text =
        selectedCities.length === 1
            ? selectedCities[0].name
            : selectedCities.length > 1
            ? `${selectedCities.length} شهر`
            : "همه ایران";

    return (
        <>
            <button
                className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
                onClick={() => setTypeDialog(DIALOG_TYPE_CITY)}
            >
                <div className="text-xl">
                    <LocationIcon />
                </div>
                <span className="text-sm">{text}</span>
            </button>
        </>
    );
};

export default Button;
