import { category } from "@/public/interfaces";
import Link from "next/link";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";

const CatItem = ({ category }: { category: category }) => {
    return (
        <Link
            href={`/new?slug=${category.slug}`}
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
        >
            <p className="">{category.title}</p>
            <div className="text-2xl text-gray-400">
                <LeftIcon />
            </div>
        </Link>
    );
};

export default CatItem;
