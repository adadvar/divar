"use client";
import { setselectedCategory } from "@/app/GlobalRedux/features/global/globalSlice";
import { category } from "@/public/interfaces";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";
import * as Icons from "react-icons/bi";
import { useDispatch } from "react-redux";

interface Props {
    category: category;
}

const CatItem = ({ category }: Props) => {
    const dispatch = useDispatch();

    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];

    return (
        <button
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
            onClick={() => dispatch(setselectedCategory(category.id))}
        >
            <div className="text-2xl text-gray-400">
                {category.icon && <IconComponent />}
            </div>
            <p className="">{category.title}</p>
            <div className="text-2xl text-gray-400">
                {category.child.length > 0 && <LeftIcon />}
            </div>
        </button>
    );
};

export default CatItem;
