"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    closeDialog,
    openDialog,
    setselectedCat,
} from "../GlobalRedux/features/global/globalSlice";
import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import CitySearchBox from "./navbar/city/SearchBox";
import SelectedCity from "./navbar/city/SelectedCity";

interface LayoutProps {
    children: ReactNode;
    haveCloseButton?: boolean;
    haveBackButton?: boolean;
    haveBottomNav?: boolean;
    haveInput?: boolean;
    haveSearchInput?: boolean;
    haveClearButton?: boolean;
    haveCat?: boolean;
    whereBack?: number;
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
    haveCat,
    whereBack = 0,
    whereClose = "",
    title,
}: LayoutProps) => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <div
            className={`lg:hidden absolute  top-0 left-0 right-0 ${
                haveBottomNav ? "bottom-[66px]" : "bottom-0"
            } bg-white w-full h-[calc(100vh-${
                haveBottomNav ? "66px" : "0px"
            })] z-50`}
        >
            <div
                className={`fixed flex flex-col items-center shadow-sm p-4 ${
                    haveSearchInput ? "h-20" : "h-16"
                } top-0 left-0 right-0 bg-white`}
            >
                <div className="flex justify-between w-full text-sm font-bold">
                    <div className="flex items-center">
                        {haveBackButton && haveCat && (
                            <button
                                className="text-gray-600 rounded-full text-2xl pe-1"
                                onClick={() =>
                                    dispatch(setselectedCat(whereBack))
                                }
                            >
                                <BackIcon />
                            </button>
                        )}

                        {haveBackButton && !haveCat && (
                            <button
                                className="text-gray-600 rounded-full text-2xl pe-1"
                                onClick={() => dispatch(closeDialog())}
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
                                    ref={inputRef}
                                    type="text"
                                    className="bg-transparent outline-none ms-5"
                                />
                            </form>
                        )}
                    </div>
                    {haveClearButton && (
                        <button className="text-red-900 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    )}
                    {haveCloseButton && (
                        <button
                            className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                            onClick={() => dispatch(openDialog(whereClose))}
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>

                {haveSearchInput && <SelectedCity />}
                {haveSearchInput && <CitySearchBox />}
            </div>
            {children}
        </div>
    );
};

export default MobOverlayLayout;
