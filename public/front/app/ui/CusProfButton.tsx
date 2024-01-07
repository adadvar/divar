import Link from "next/link";
import React, { MouseEvent, ReactNode } from "react";
type CustomButtonProps = {
    icon: ReactNode;
    title: string;
    linkTo?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
};
const CusProfButton = ({ icon, title, linkTo, onClick }: CustomButtonProps) => {
    if (linkTo) {
        return (
            <Link
                href={linkTo}
                className="flex items-center hover:bg-gray-200 w-full p-2 rounded"
            >
                {icon}
                <p className="ps-2">{title}</p>
            </Link>
        );
    } else {
        return (
            <button
                className="flex items-center text-gray-500 hover:bg-gray-100 w-full p-2 rounded"
                onClick={onClick}
            >
                {icon}
                <p className="text-sm ps-2 ">{title}</p>
            </button>
        );
    }
};

export default CusProfButton;
