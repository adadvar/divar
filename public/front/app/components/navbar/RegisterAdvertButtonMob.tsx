"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_REGISTER_ADVERT_MOB } from "@/public/utils";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPlusCircle as AddIcon } from "react-icons/bi";
import { RootState } from "@/app/GlobalRedux/store";

const RegisterAdvertButtonMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeOpenDialog == DIALOG_TYPE_REGISTER_ADVERT_MOB
                    ? "text-red-700"
                    : "text-gray-800"
            }`}
            onClick={() =>
                dispatch(openDialog(DIALOG_TYPE_REGISTER_ADVERT_MOB))
            }
        >
            <div className="text-xl">
                <AddIcon />
            </div>
            <p className="text-xs">ثبت آگهی</p>
        </button>
    );
};

export default RegisterAdvertButtonMob;
