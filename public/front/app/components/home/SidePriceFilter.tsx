"use client";
import React, { useState, ChangeEvent } from "react";
import RegularDropDownSubmenu from "../RegularDropDown";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SidePriceFilter = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPrice = event.target.value.replace(/\D/g, "");
        const formattedPrice = Number(inputPrice).toLocaleString("en-US");

        setMinPrice(formattedPrice);
    };
    const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputPrice = event.target.value.replace(/\D/g, "");
        const formattedPrice = Number(inputPrice).toLocaleString("en-US");

        setMaxPrice(formattedPrice);
    };

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        if (minPrice || maxPrice)
            params.set(
                "price",
                `${minPrice.replace(",", "")}-${maxPrice.replace(",", "")}`
            );
        else params.delete("price");
        replace(`${pathname}?${params.toString()}`);
    };

    const submenuContent = [
        <div className="flex justify-between my-4 text-sm">
            <p className="ms-2">حداقل</p>
            <input
                className="text-gray-900 border w-1/2 border-gray-300 bg-transparent outline-none rounded text-center"
                value={minPrice}
                onChange={handleMinPriceChange}
            />
            <p>تومان</p>
        </div>,
        <div className="flex justify-between my-4 text-sm">
            <p className="ms-2">حداکثر</p>
            <input
                className="text-gray-900 border w-1/2 border-gray-300 bg-transparent outline-none rounded text-center"
                value={maxPrice}
                onChange={handleMaxPriceChange}
            />
            <p>تومان</p>
        </div>,
        <button
            onClick={() => handleClick()}
            className="btn btn-ghost flex btn-hover min-h-[20px] h-6 m-auto text-white text-xs bg-red-700 hover:bg-red-600"
        >
            اعمال قیمت
        </button>,
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
