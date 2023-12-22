"use client";

import { useGlobal } from "@/app/src/global-store";
import { DIALOG_TYPE_PROFILE_MOB } from "@/public/utils";
import { BsPersonFill as PersonIcon } from "react-icons/bs";

const ProfileButtonMob = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

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
