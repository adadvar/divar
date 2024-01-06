"use client";
import { useTmp } from "@/app/store/global-store";
import { category } from "@/public/interfaces";
import * as Icons from "react-icons/bi";

interface MegaCatItemProps {
    category: category;
}

const MegaCatItem = ({ category }: { category: category }) => {
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    const { hoveredCatId, setHoveredCat } = useTmp();
    const isHovered = hoveredCatId == category.id;
    return (
        <div
            className={`flex items-center rounded cursor-pointer px-2 py-1 ${
                isHovered ? "bg-gray-100" : ""
            }`}
            onMouseEnter={() => setHoveredCat(category.id)}
            // onMouseLeave={() => setHoveredCat(0)}
        >
            <div className="text-xl p-1 rounded">
                {category.icon && <IconComponent />}
            </div>

            <p className={`text-xs my-1 font-bold`}>{category.title}</p>
        </div>
    );
};

export default MegaCatItem;
