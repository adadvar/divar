"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { DIALOG_TYPE_CATEGORY } from "@/public/utils";
import {
    BiChevronDown as DownIcon,
    BiChevronUp as UpIcon,
} from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    text: string;
}

const CategoryButton = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    return (
        <button
            className="btn btn-ghost text-gray-500 hover:text-gray-800"
            onClick={() => dispatch(openDialog(DIALOG_TYPE_CATEGORY))}
        >
            <div>دسته ها</div>
            <div className="text-lg">
                {typeOpenDialog && typeOpenDialog == DIALOG_TYPE_CATEGORY ? (
                    <UpIcon />
                ) : (
                    <DownIcon />
                )}
            </div>
        </button>
    );
};

export default CategoryButton;
