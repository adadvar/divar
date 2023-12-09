"use client";
import React, { useState, ChangeEvent } from "react";
import RegularDropDownSubmenu from "../RegularDropDownSubmenu";
import ToggleButton from "../ToggleButton";

const SideStatusFilter = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const submenuContent = [
        <div className="flex justify-between pb-2">
            <span className="text-black text-xs">فقط عکس دار</span>
            <ToggleButton />
        </div>,
        <div className="flex justify-between ">
            <span className="text-black text-xs">فقط فوری</span>
            <ToggleButton />
        </div>,
    ];
    return (
        <div className="my-5">
            <RegularDropDownSubmenu
                title="وضعیت آگهی"
                submenuItems={submenuContent}
            />
        </div>
    );
};

export default SideStatusFilter;
