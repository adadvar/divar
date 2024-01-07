"use client";
import { BiSearch as SearchIcon } from "react-icons/bi";
import SearchItems from "./SearchItems";
import { DIALOG_TYPE_SEARCH } from "@/public/utils";
import { useGlobal } from "@/app/store/global-store";

const InputBox = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    return (
        <form className="relative">
            <div className="absolute inset-y-0 start-2 flex items-center pointer-events-none">
                <SearchIcon />
            </div>
            <input
                type="search"
                id="category-search"
                className="block p-2 ps-8 text-sm w-full text-gray-900 bg-gray-100 outline-none rounded-lg focus:rounded-none focus:rounded-t-lg focus:border-b focus:shadow-md focus:bg-white"
                placeholder="جستجو در همه آگهی ها"
                onClick={() => setTypeDialog(DIALOG_TYPE_SEARCH)}
            />
            {typeDialog && typeDialog == DIALOG_TYPE_SEARCH && (
                <div className="absolute left-0 right-0">
                    <SearchItems />
                </div>
            )}
        </form>
    );
};

export default InputBox;
