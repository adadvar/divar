import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";
import RegularList from "../RegularList";
import { appendQueryParams } from "@/public/utils";

const SideCatItem = ({
    category,
    slug = [],
    searchParams,
    parentSlug,
}: {
    category: category;
    slug: string[];
    searchParams: { [key: string]: string | string[] | undefined };
    parentSlug: string | null;
}) => {
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    if (parentSlug != null) {
        if (!(slug.length && slug[1] === parentSlug)) {
            return null;
        }
    } else {
        if (slug.length && slug[1] !== category.slug) {
            return null;
        }
    }
    const city = slug.length && slug[0] ? slug[0] : "iran";
    const url = appendQueryParams(`/s/${city}/${category.slug}`, {});
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
                    {category.icon && <IconComponent />}
                </div>

                <p
                    className={`text-sm my-1 font-bold ${
                        parentSlug ? "ms-10" : ""
                    }`}
                >
                    {category.title}
                </p>
            </Link>
            <RegularList
                items={category.child}
                resourceName="category"
                ItemComponent={SideCatItem}
                itemProps={{
                    slug,
                    searchParams,
                    parentSlug: category.slug,
                }}
            />
        </>
    );
};

export default SideCatItem;
