import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";
import RegularList from "../RegularList";

const SideCatItem = ({
    category,
    slug = [],
    searchParams,
    witchViewCategory,
}: {
    category: category;
    slug: string[];
    searchParams: { [key: string]: string | string[] | undefined };
    witchViewCategory: string;
}) => {
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];

    let space = "";
    if (witchViewCategory == "sub") space = "ms-10";
    if (witchViewCategory == "subsub") space = "ms-14";
    const border =
        witchViewCategory == "subsub"
            ? "border-s-[1px] border-gray-400 ps-3"
            : "";
    const city = slug.length && slug[0] ? slug[0] : "iran";
    return (
        <>
            <Link
                href={`/s/${city}/${category.slug}`}
                className={`flex items-center ${
                    slug[1] === category.slug
                        ? "text-gray-600"
                        : "text-gray-400"
                } text-gray-400 hover:text-gray-600 my-2`}
            >
                <div className="text-2xl p-1 rounded">
                    {/* {category.icon && <IconComponent />} */}
                </div>

                <p className={`text-sm my-1 font-bold ${border} ${space}`}>
                    {category.title}
                </p>
            </Link>
        </>
    );
};

export default SideCatItem;
