"use client";

import { DIALOG_TYPE_REGISTER_ADVERT_MOB } from "@/public/utils";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPlusCircle as AddIcon } from "react-icons/bi";
import { useGlobal } from "@/app/store/global-store";

const RegisterAdvertButtonMob = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeDialog == DIALOG_TYPE_REGISTER_ADVERT_MOB
                    ? "text-red-700"
                    : "text-gray-800"
            }`}
            onClick={() => setTypeDialog(DIALOG_TYPE_REGISTER_ADVERT_MOB)}
        >
            <div className="text-xl">
                <AddIcon />
            </div>
            <p className="text-xs">ثبت آگهی</p>
        </button>
    );
};

export default RegisterAdvertButtonMob;
