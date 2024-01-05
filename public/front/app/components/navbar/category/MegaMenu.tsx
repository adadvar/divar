"use client";
import React from "react";
import RegularList from "../../RegularList";
import { category } from "@/public/interfaces";
import MegaCatItem from "./MegaCatItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useGlobal } from "@/app/store/global-store";

const MegaMenu = () => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const {} = useGlobal();
    return (
        <div className="fixed inset-0  min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3 z-50">
            <div className="flex flex-col py-4 overflow-hidden h-full">
                <button>همه آگهی ها</button>
                {/* <RegularList
                    items={categories}
                    resourceName="category"
                    ItemComponent={MegaCatItem}
                /> */}
            </div>
        </div>
    );
};

export default MegaMenu;
