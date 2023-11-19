import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import React from "react";
import { BsXLg as CloseIcon } from "react-icons/bs";

interface MobOverlayCloseButtonProps {
    haveCloseButton?: boolean;
    dispatch: Function;
    whereClose: string;
}

const MobOverlayCloseButton: React.FC<MobOverlayCloseButtonProps> = ({
    haveCloseButton,
    dispatch,
    whereClose,
}) => {
    return (
        <>
            {haveCloseButton && (
                <button
                    className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                    onClick={() => dispatch(openDialog(whereClose))}
                >
                    <CloseIcon />
                </button>
            )}
        </>
    );
};

export default MobOverlayCloseButton;
