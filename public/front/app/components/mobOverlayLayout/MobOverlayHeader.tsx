import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import React from "react";
import { BsArrowRightShort as BackIcon } from "react-icons/bs";

interface MobOverlayHeaderProps {
    title?: string;
    haveBackButton?: boolean;
    haveCat?: boolean;
    dispatch: Function;
    whereBack: string;
}

const MobOverlayHeader: React.FC<MobOverlayHeaderProps> = ({
    title,
    haveBackButton,
    haveCat,
    dispatch,
    whereBack,
}) => {
    return (
        <div className="flex justify-between w-full text-sm font-bold">
            <div className="flex items-center">
                {haveBackButton && haveCat && (
                    <button
                        className="text-gray-600 rounded-full text-2xl pe-1"
                        onClick={() => dispatch(openDialog(whereBack))}
                    >
                        <BackIcon />
                    </button>
                )}

                {haveBackButton && !haveCat && (
                    <button
                        className="text-gray-600 rounded-full text-2xl pe-1"
                        onClick={() => dispatch(openDialog(whereBack))}
                    >
                        <BackIcon />
                    </button>
                )}

                {title && <p className="text-gray-900 font-bold">{title}</p>}
            </div>
        </div>
    );
};

export default MobOverlayHeader;
