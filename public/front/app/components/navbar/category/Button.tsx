"use client";
import { useGlobal } from "@/app/store/global-store";
import { DIALOG_TYPE_CATEGORY_MEGA_MENU } from "@/public/utils";
import {
    BiChevronDown as DownIcon,
    BiChevronUp as UpIcon,
} from "react-icons/bi";

const Button = () => {
    const { typeDialog, setTypeDialog } = useGlobal();
    const handleClick = () => {
        if (typeDialog === DIALOG_TYPE_CATEGORY_MEGA_MENU) {
            setTypeDialog("");
        } else {
            setTypeDialog(DIALOG_TYPE_CATEGORY_MEGA_MENU);
        }
    };

    return (
        <button
            className="btn btn-ghost text-gray-500 hover:text-gray-800"
            onClick={handleClick}
        >
            <div>دسته ها</div>
            <div className="text-lg">
                {typeDialog && typeDialog == DIALOG_TYPE_CATEGORY_MEGA_MENU ? (
                    <UpIcon />
                ) : (
                    <DownIcon />
                )}
            </div>
        </button>
    );
};

export default Button;
