"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { DIALOG_TYPE_CATEGORY_MOB } from "@/public/utils";
import { BiListUl as ListIcon } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const ButtonMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <button
            className={`flex flex-col gap-1 px-2 m-0 ${
                typeOpenDialog == DIALOG_TYPE_CATEGORY_MOB
                    ? "text-red-900"
                    : "text-gray-800"
            }`}
            onClick={() => dispatch(openDialog(DIALOG_TYPE_CATEGORY_MOB))}
        >
            <div className="text-xl">
                <ListIcon />
            </div>
            <p className="text-xs">دسته ها</p>
        </button>
    );
};

export default ButtonMob;
