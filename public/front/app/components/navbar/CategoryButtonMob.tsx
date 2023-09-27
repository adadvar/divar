"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { DIALOG_TYPE_CATEGORY } from "@/public/utils";
import { BiListUl as ListIcon } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const CategoryButtonMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <button
            className="flex flex-col gap-1 text-gray-500 hover:text-gray-800 px-2 m-0"
            onClick={() => dispatch(openDialog(DIALOG_TYPE_CATEGORY))}
        >
            <div className="text-xl">
                <ListIcon />
            </div>
            <p className="text-xs">دسته ها</p>
        </button>
    );
};

export default CategoryButtonMob;
