"use client";
import { useGlobal, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_CATEGORY_MOB } from "@/app/lib/utils";
import { BiListUl as ListIcon } from "react-icons/bi";

const ButtonMob = () => {
    const { typeDialog, setTypeDialog } = useTmp();

    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeDialog == DIALOG_TYPE_CATEGORY_MOB
                    ? "text-red-700"
                    : "text-gray-800"
            }`}
            onClick={() => setTypeDialog(DIALOG_TYPE_CATEGORY_MOB)}
        >
            <div className="text-xl">
                <ListIcon />
            </div>
            <p className="text-xs">دسته ها</p>
        </button>
    );
};

export default ButtonMob;
