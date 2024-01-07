"use client";
import React, { useState } from "react";

const ToggleButton = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div>
            <button
                onClick={handleToggle}
                className={`w-8 h-5 px-[2px] rounded-full relative duration-200 ease-in-out ${
                    isToggled ? "bg-red-800" : "bg-gray-400"
                }`}
            >
                <span
                    className={`inline-block w-4 h-4 mt-[2px] bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        isToggled ? "-translate-x-2" : "translate-x-2"
                    }`}
                ></span>
            </button>
        </div>
    );
};

export default ToggleButton;
