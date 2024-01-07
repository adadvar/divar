import { category } from "@/public/interfaces";
import Link from "next/link";

const SideSubCatItem = ({
    category,
    slug = [],
}: {
    category: category;
    slug: string[];
}) => {
    const city = slug.length && slug[0] ? slug[0] : "iran";

    return (
        <Link
            href={`/s/${city}/${category.slug}`}
            className="flex items-center text-gray-400 hover:text-gray-600 my-2"
        >
            <p className="text-sm my-1 ms-10 font-bold">{category.title}</p>
        </Link>
    );
};

export default SideSubCatItem;
