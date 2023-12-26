import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const SideSubCatItem = ({
    category,
    slug = [],
}: {
    category: category;
    slug: string[];
}) => {
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    return (
        <Link
            href={`/s/${category.slug}`}
            className="flex items-center text-gray-400 hover:text-gray-600 my-2"
        >
            <p className="text-sm my-1 ms-10 font-bold">{category.title}</p>
        </Link>
    );
};

export default SideSubCatItem;
