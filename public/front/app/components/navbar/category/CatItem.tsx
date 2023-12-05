"use client";
import { setselectedCat } from "@/app/GlobalRedux/features/global/globalSlice";
import { cat } from "@/public/interfaces";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";
import * as Icons from "react-icons/bi";
import { useDispatch } from "react-redux";

interface Props {
    cat: cat;
}

const CatItem = ({ cat }: Props) => {
    const dispatch = useDispatch();

    const IconComponent = cat.icon && Icons[cat.icon as keyof typeof Icons];

    return (
        <button
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
            onClick={() => dispatch(setselectedCat(cat.id))}
        >
            <div className="text-2xl text-gray-400">
                {cat.icon && <IconComponent />}
            </div>
            <p className="">{cat.title}</p>
            <div className="text-2xl text-gray-400">
                {cat.child.length > 0 && <LeftIcon />}
            </div>
        </button>
    );
};

export default CatItem;
