"use client";
import React, { ReactNode, useRef, useEffect } from "react";
import {
    BsArrowRightShort as BackIcon,
    BsXLg as CloseIcon,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import CitySearchBox from "../navbar/city/SearchBox";
import SelectedCity from "../navbar/city/SelectedCity";

interface LayoutProps {
    children: ReactNode;
    haveBackButton?: boolean;
    haveBottomNav?: boolean;
    haveInput?: boolean;
    haveSearchInput?: boolean;
    haveClearButton?: boolean;
    haveCloseButton?: boolean;
    haveCategory?: boolean;
    whereBack?: string;
    whereClose?: string;
    title?: string;
}

const MobOverlayLayout: React.FC<LayoutProps> = ({
    children,
    haveBackButton,
    haveBottomNav,
    haveInput,
    haveSearchInput,
    haveClearButton,
    haveCloseButton,
    haveCategory,
    whereBack = "",
    whereClose = "",
    title,
}) => {
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
                <MobOverlayHeader
                    title={title}
                    haveBackButton={haveBackButton}
                    haveCategory={haveCategory}
                    whereBack={whereBack}
                />

                <MobOverlayClearButton haveClearButton={haveClearButton} />

                <MobOverlayCloseButton
                    haveCloseButton={haveCloseButton}
                    whereClose={whereClose}
                />

                <MobOverlayInput haveInput={haveInput} />
            </div>

            {haveSearchInput && <SelectedCity />}
            {haveSearchInput && <CitySearchBox />}
            {children}
        </div>
    );
};

const MobOverlayHeader = ({
    title = "",
    haveBackButton = false,
    haveCategory = false,
    whereBack = "",
}) => {
    return (
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
                        onClick={() => {}}
                    >
                        <BackIcon />
                    </button>
                )}

                {title && <p className="text-gray-900 font-bold">{title}</p>}
            </div>
        </div>
    );
};

const MobOverlayClearButton = ({ haveClearButton = false }) => {
    return (
        <>
            {haveClearButton && (
                <button className="text-red-700 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                    حذف همه
                </button>
            )}
        </>
    );
};

const MobOverlayCloseButton = ({
    haveCloseButton = false,
    whereClose = "",
}) => {
    const dispatch = useDispatch();
    return (
        <>
            {haveCloseButton && (
                <button
                    className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                    onClick={() => {}}
                >
                    <CloseIcon />
                </button>
            )}
        </>
    );
};

const MobOverlayInput = ({ haveInput = false }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            {haveInput && (
                <form className="flex p-[5px]">
                    <input
                        ref={inputRef}
                        type="text"
                        className="bg-transparent outline-none ms-5"
                    />
                </form>
            )}
        </>
    );
};

export default MobOverlayLayout;
