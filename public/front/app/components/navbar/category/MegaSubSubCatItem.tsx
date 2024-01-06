import { category } from "@/public/interfaces";
import Link from "next/link";

const MegaSubCatItem = ({ category }: { category: category }) => {
    return (
        <>
            <button
                // href={`/s/${city}/${category.slug}`}
                className="w-1/3 ps-10 w-30  my-1"
            >
                <p className="text-start text-xs text-gray-500 hover:text-red-800">
                    {category.title}
                </p>
            </button>
        </>
    );
};

export default MegaSubCatItem;
