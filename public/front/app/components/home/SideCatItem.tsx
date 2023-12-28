import { category } from "@/public/interfaces";
import { findCategory } from "@/public/utils";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const SideCatItem = ({
    category,
    slug = [],
    level,
}: {
    category: category;
    slug: string[];
    level: number;
}) => {
    // const subCategory =
    // slug && slug[1] && findCategory(categories, "slug", slug[1])?.child;
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    if (level == 1 && slug.length && slug[1] !== category.slug) return null;

    const city = slug.length && slug[0] ? slug[0] : "iran";
    return (
        <Link
            href={`/s/${city}/${category.slug}`}
            className={`flex items-center ${
                slug[1] === category.slug ? "text-gray-600" : "text-gray-400"
            } text-gray-400 hover:text-gray-600 my-2`}
        >
            <div className="text-2xl p-1 rounded">
                {category.icon && <IconComponent />}
            </div>

            <p className={`text-sm my-1 font-bold ${level != 1 && "ps-10"}`}>
                {category.title}
            </p>
        </Link>
    );
};

export default SideCatItem;
