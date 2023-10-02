"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_PROFILE_MOB } from "@/public/utils";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonFill as PersonIcon } from "react-icons/bs";
import { RootState } from "@/app/GlobalRedux/store";

const ProfileButtonMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <button
            className={`flex flex-col gap-1 px-2 m-0 ${
                typeOpenDialog == DIALOG_TYPE_PROFILE_MOB
                    ? "text-red-900"
                    : "text-gray-800"
            }`}
            onClick={() => dispatch(openDialog(DIALOG_TYPE_PROFILE_MOB))}
        >
            <div className="text-xl">
                <PersonIcon />
            </div>
            <p className="text-xs">دیوارمن</p>
        </button>
    );
};

export default ProfileButtonMob;
