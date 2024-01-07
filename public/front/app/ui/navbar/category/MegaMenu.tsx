"use client";
import React, { useState } from "react";
import RegularList from "../../RegularList";
import { category } from "@/public/interfaces";
import MegaCatItem from "./MegaCatItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobal, useTmp } from "@/app/store/global-store";
import { BsArrowRightShort as BackIcon } from "react-icons/bs";
import HR from "../../HR";
import MegaSubCatItem from "./MegaSubCatItem";

const MegaMenu = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const { categories } = useGlobal();
    const { hoveredCatId, setHoveredCat } = useTmp();
    const { setTypeDialog } = useGlobal();

    const subCatitem = hoveredCatId ? categories[hoveredCatId - 1].child : [];

    const handleClick = () => {
        const url = `/s/iran${params.toString() && `?${params.toString()}`}`;
        setTypeDialog("");
        replace(url);
    };

    return (
        <div className="fixed flex left-5 top-0 bottom-8 min-h-[80%] max-h-[80%] p-6 bg-white m-auto  text-gray-500 rounded-md gap-1 w-3/4 z-50">
            <div className="flex flex-col w-1/5 overflow-hidden h-full text-xs  gap-y-3">
                <button
                    className="flex border border-gray-100 rounded px-2 py-1 text-start hover:bg-gray-100"
                    onClick={handleClick}
                >
                    <span className="text-lg">
                        <BackIcon />
                    </span>
                    همه آگهی ها
                </button>
                <RegularList
                    items={categories}
                    resourceName="category"
                    ItemComponent={MegaCatItem}
                />
            </div>
            <HR />
            <div className="flex flex-col flex-wrap w-4/5 h-full text-xs ">
                <RegularList
                    items={subCatitem}
                    resourceName="category"
                    ItemComponent={MegaSubCatItem}
                />
            </div>
        </div>
    );
};

export default MegaMenu;
