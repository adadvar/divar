"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_CATEGORY } from "@/public/utils";
import { useDispatch } from "react-redux";
import { BiSolidPlusCircle as AddIcon } from "react-icons/bi";

const RegisterAdvertButtonMob = () => {
    const dispatch = useDispatch();

    return (
        <button
            className="flex flex-col gap-1 text-gray-500 hover:text-gray-800 px-2 m-0"
            onClick={() => dispatch(openDialog(DIALOG_TYPE_CATEGORY))}
        >
            <div className="text-xl">
                <AddIcon />
            </div>
            <p className="text-xs">ثبت آگهی</p>
        </button>
    );
};

export default RegisterAdvertButtonMob;
