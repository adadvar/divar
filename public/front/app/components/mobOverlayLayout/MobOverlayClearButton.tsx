import React from "react";

interface MobOverlayClearButtonProps {
    haveClearButton?: boolean;
}

const MobOverlayClearButton: React.FC<MobOverlayClearButtonProps> = ({
    haveClearButton,
}) => {
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

export default MobOverlayClearButton;
