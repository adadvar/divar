"use client";

import { DIALOG_TYPE_PROFILE_MOB } from "@/public/utils";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill as PersonIcon } from "react-icons/bs";
import { useGlobal } from "@/app/store/auth-store";

const ProfileButtonMob = () => {
    const typeDialog = useGlobal.getState().typeDialog;
    const setTypeDialog = useGlobal.getState().setTypeDialog;

    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeDialog == DIALOG_TYPE_PROFILE_MOB
                    ? "text-red-700"
                    : "text-gray-800"
            }`}
            onClick={() => setTypeDialog(DIALOG_TYPE_PROFILE_MOB)}
        >
            <div className="text-xl">
                <PersonIcon />
            </div>
            <p className="text-xs">دیوارمن</p>
        </button>
    );
};

export default ProfileButtonMob;
