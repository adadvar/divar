"use client";
import { useState } from "react";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";
import * as Icons from "react-icons/bi";

interface Props {
    item: {
        id: number;
        title: string;
        slug: string;
        parent_id: number | null;
        icon: string | null;
        child: object;
    };
}

const CatItem = ({ item }: Props) => {
    const IconComponent = item.icon && Icons[item.icon];
    const [isClicked, SetIsClicked] = useState(false);

    return (
        <button
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
            onClick={() => SetIsClicked(true)}
        >
            <div className="text-2xl text-gray-400">
                {item.icon && <IconComponent />}
            </div>
            <p className="">{item.title}</p>
            <div className="text-2xl text-gray-400">
                <LeftIcon />
            </div>
        </button>
    );
};

export default CatItem;
