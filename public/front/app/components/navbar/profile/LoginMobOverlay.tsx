"use client";
import { useDispatch, useSelector } from "react-redux";
import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import { RootState } from "@/app/GlobalRedux/store";

const SelectMobOverlay = () => {
    const global = useSelector((state: RootState) => state.global);
    const selectedCat = global.selectedCat;
    const dispatch = useDispatch();

    return (
        <div className="lg:hidden absolute top-0 left-0 right-0 bottom-[66px]  bg-white m-auto rounded-md w-full h-[calc(100vh-66px)] z-50">
            <div className="flex flex-col pt-4 overflow-hidden h-full">
                <div className="flex justify-between px-4">
                    <h1 className="text-gray-900 font-bold">دیوار من</h1>
                </div>
                <div className="h-1 left-0 right-0 shadow-sm"></div>
            </div>
        </div>
    );
};

export default SelectMobOverlay;
