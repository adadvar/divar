import React, { ReactNode, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import MobOverlayHeader from "./MobOverlayHeader";
import MobOverlayClearButton from "./MobOverlayClearButton";
import MobOverlayCloseButton from "./MobOverlayCloseButton";
import CitySearchBox from "../navbar/city/SearchBox";
import SelectedCity from "../navbar/city/SelectedCity";
import MobOverlayInput from "./MobOverlayInput";

interface LayoutProps {
    children: ReactNode;
    haveBackButton?: boolean;
    haveBottomNav?: boolean;
    haveInput?: boolean;
    haveSearchInput?: boolean;
    haveClearButton?: boolean;
    haveCloseButton?: boolean;
    haveCat?: boolean;
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
    haveCat,
    whereBack = "",
    whereClose = "",
    title,
}) => {
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
                <MobOverlayHeader
                    title={title}
                    haveBackButton={haveBackButton}
                    haveCat={haveCat}
                    dispatch={dispatch}
                    whereBack={whereBack}
                />

                <MobOverlayClearButton haveClearButton={haveClearButton} />

                <MobOverlayCloseButton
                    haveCloseButton={haveCloseButton}
                    dispatch={dispatch}
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

export default MobOverlayLayout;
