"use client";
import { useGlobal, useTmp } from "@/app/store/global-store";
import { category } from "@/public/interfaces";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as Icons from "react-icons/bi";

interface MegaCatItemProps {
    category: category;
}

const MegaCatItem = ({ category }: { category: category }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    const { hoveredCatId, setTypeDialog, setHoveredCat } = useTmp();
    const isHovered = hoveredCatId == category.id;
    const handleClick = () => {
        const url = `/s/iran/${category.slug}${
            params.toString() && `?${params.toString()}`
        }`;
        setTypeDialog("");
        replace(url);
    };
    return (
        <button
            className={`flex items-center justify-between rounded cursor-pointer w-full px-2 py-1 ${
                isHovered ? "bg-gray-100" : ""
            }`}
            onClick={handleClick}
            onMouseEnter={() => setHoveredCat(category.id)}
        >
            <div className="flex">
                <div className="text-xl p-1">
                    {category.icon && <IconComponent />}
                </div>

                <p className={`text-xs my-1 font-bold`}>{category.title}</p>
            </div>
            <div className="text-xl">
                <Icons.BiChevronLeft />
            </div>
        </button>
    );
};

export default MegaCatItem;
