"use client";
import React, { useState } from "react";
import {
    BiChevronDown as DownIcon,
    BiChevronUp as UpIcon,
} from "react-icons/bi";

interface RegularDropDownSubmenuProps {
    title: string;
    submenuItems: React.ReactNode[];
}

const RegularDropDownSubmenu = ({
    title,
    submenuItems,
}: RegularDropDownSubmenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSubMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="">
            <div
                className="flex items-center cursor-pointer select-none"
                onClick={toggleSubMenu}
            >
                <div className="text-2xl">
                    {isOpen ? <UpIcon /> : <DownIcon />}
                </div>
                <p className="text-sm text-gray-800 ms-2">{title}</p>
            </div>
            {isOpen && (
                <div className="">
                    {submenuItems.map((content, index) => (
                        <div key={index}>{content}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RegularDropDownSubmenu;
