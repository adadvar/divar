"use client";
import React, { useState, ChangeEvent } from "react";
import RegularDropDownSubmenu from "../RegularDropDownSubmenu";

const SidePriceFilter = () => {
    const [price, setPrice] = useState("");

    const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPrice = event.target.value.replace(/\D/g, "");
        const formattedPrice = Number(inputPrice).toLocaleString("en-US");

        setPrice(formattedPrice);
    };
    const submenuContent = [
        <div className="flex justify-between my-2 text-sm">
            <p className="ms-2">حداقل</p>
            <input
                className="text-gray-900 border w-32 border-gray-300 bg-transparent outline-none rounded text-center"
                value={price}
                onChange={handlePriceChange}
            />
            <p>تومان</p>
        </div>,
        <div className="flex justify-between my-2 text-sm">
            <p className="ms-2">حداکثر</p>
            <input
                className="text-gray-900 border w-32 border-gray-300 bg-transparent outline-none rounded text-center"
                value={price}
                onChange={handlePriceChange}
            />
            <p>تومان</p>
        </div>,
    ];
    return (
        <div className="my-5">
            <RegularDropDownSubmenu
                title="قیمت"
                submenuItems={submenuContent}
            />
        </div>
    );
};

export default SidePriceFilter;
