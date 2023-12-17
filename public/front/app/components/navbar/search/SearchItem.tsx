"use client";
import { useState } from "react";
import {
    BsX as CloseIcon,
    BsPin as PinIcon,
    BsPinFill as PinFillIcon,
} from "react-icons/bs";

const SearchItem = () => {
    const [isPin, setIsPin] = useState(false);

    const handlePin = (e: React.MouseEvent) => {
        e.preventDefault();

        setIsPin(!isPin);
    };

    return (
        <div className="flex flex-col justify-between h-[124px] hover:bg-gray-100 p-5 cursor-pointer">
            <div className="flex w-full justify-start items-center">
                <button className="btn-hover text-xl" onClick={handlePin}>
                    {isPin ? (
                        <div className="text-red-700 rounded-full p-2 hover:bg-[#ff00000e]">
                            <PinFillIcon />{" "}
                        </div>
                    ) : (
                        <div className="text-gray-500 p-2 rounded-full hover:bg-gray-200">
                            {" "}
                            <PinIcon />
                        </div>
                    )}
                </button>
                <span className="text-xs ms-4">در موبایل و تبلت</span>
                <button
                    className={`btn-hover text-gray-500 text-xl ms-auto hover:bg-gray-200 rounded-full p-2 `}
                >
                    <CloseIcon />
                </button>
            </div>
            <div className="text-sm text-start text-gray-500 ms-5 font-medium bg-gray-200 p-2 rounded-sm self-start">
                نوع آگهی دهنده همه
            </div>
        </div>
    );
};

export default SearchItem;
