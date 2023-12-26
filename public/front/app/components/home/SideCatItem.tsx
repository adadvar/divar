import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const SideCatItem = ({
    category,
    slug = [],
}: {
    category: category;
    slug: string[];
}) => {
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    if (
        category.parent_id !== null ||
        (slug.length && slug[0] !== category.slug)
    )
        return null;
    return (
        <Link
            href={`/s/${category.slug}`}
            className={`flex items-center ${
                slug[0] === category.slug ? "text-gray-600" : "text-gray-400"
            } text-gray-400 hover:text-gray-600 my-2`}
        >
            <div className="text-2xl p-1 rounded">
                {category.icon && <IconComponent />}
            </div>
            <p className="text-sm my-1 font-bold">{category.title}</p>
        </Link>
    );
};

export default SideCatItem;
