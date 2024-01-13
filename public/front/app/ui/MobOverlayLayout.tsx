import React, { ReactNode } from "react";
import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import CitySearchBox from "./navbar/city/SearchBox";
import SelectedCity from "./navbar/city/SelectedCity";
import { useGlobal, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_PROFILE_MOB } from "@/app/lib/utils";

interface LayoutProps {
    children: ReactNode;
    haveCloseButton?: boolean;
    haveBackButton?: boolean;
    haveBottomNav?: boolean;
    haveInput?: boolean;
    haveSearchInput?: boolean;
    haveClearButton?: boolean;
    haveCategory?: boolean;
    whereBack?: string;
    whereClose?: string;
    title?: string;
}

const MobOverlayLayout = ({
    children,
    haveCloseButton,
    haveBackButton,
    haveBottomNav,
    haveInput,
    haveSearchInput,
    haveClearButton,
    haveCategory,
    whereBack = "",
    whereClose = "",
    title,
}: LayoutProps) => {
    const { typeDialog, setTypeDialog } = useTmp();

    return (
        <div
            className={`lg:hidden fixed inset-0 bg-white overflow-y-auto z-50`}
        >
            <div
                className={`fixed flex flex-col items-center shadow-sm p-4 ${
                    haveSearchInput ? "h-32" : "h-16"
                } top-0 left-0 right-0 bg-white`}
            >
                <div className="flex justify-between w-full text-sm font-bold">
                    <div className="flex items-center">
                        {haveBackButton && haveCategory && (
                            <button
                                className="text-gray-600 rounded-full text-2xl pe-1"
                                onClick={() => {}}
                            >
                                <BackIcon />
                            </button>
                        )}

                        {haveBackButton && !haveCategory && (
                            <button
                                className="text-gray-600 rounded-full text-2xl pe-1"
                                onClick={() => {
                                    setTypeDialog(whereBack);
                                }}
                            >
                                <BackIcon />
                            </button>
                        )}

                        {title && (
                            <p className="text-gray-900 font-bold">{title}</p>
                        )}
                        {haveInput && (
                            <form className="flex p-[5px]">
                                <input
                                    type="text"
                                    className="bg-transparent outline-none ms-5"
                                />
                            </form>
                        )}
                    </div>
                    {haveClearButton && (
                        <button className="text-red-700 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    )}
                    {haveCloseButton && (
                        <button
                            className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                            onClick={() => {
                                setTypeDialog(DIALOG_TYPE_PROFILE_MOB);
                            }}
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>

                {haveSearchInput && <SelectedCity />}
                {/* {haveSearchInput && <CitySearchBox />} */}
            </div>
            {children}
        </div>
    );
};

export default MobOverlayLayout;
