import Link from "next/link";
import * as Icons from "react-icons/bi";
import RegularList from "../RegularList";
import { category } from "@/public/interfaces";

type Props = {
    category: category; // Replace with the correct type for category
    slug: string[];
    searchParams: { [key: string]: string | string[] | undefined };
    level?: number;
};

const SideCatItem = ({
    category,
    slug = [],
    searchParams,
    level = 0,
}: Props) => {
    const firstLevel = searchParams?.firstLevel;
    const secondLevel = searchParams?.secondLevel;
    const isFirstLevel = category.id.toString() === firstLevel;
    const isSecondLevel = category.id.toString() === secondLevel;

    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];

    const handleLink = (categoryId: string, currentLevel: number): string => {
        if (currentLevel === 0) {
            return `firstLevel=${categoryId}&secondLevel=`;
        } else if (currentLevel === 1) {
            return `firstLevel=${firstLevel}&secondLevel=${categoryId}`;
        } else {
            return "";
        }
    };

    const city = slug.length ? slug[0] : "iran";

    const shouldRenderCategory =
        (level === 0 && (isFirstLevel || !firstLevel)) ||
        (level === 1 && isFirstLevel) ||
        (level === 2 && isSecondLevel);

    return (
        shouldRenderCategory && (
            <>
                <Link
                    href={`/s/${city}/${category.slug}?${handleLink(
                        category.id.toString(),
                        level
                    )}`}
                    className={`flex items-center ${
                        slug[level] === category.slug
                            ? "text-gray-600"
                            : "text-gray-400"
                    } text-gray-400 hover:text-gray-600 my-2`}
                >
                    <div className="text-2xl p-1 rounded">
                        {category.icon && <IconComponent />}
                    </div>
                    <p className="text-sm my-1 font-bold">{category.title}</p>
                </Link>
                {category.child && (
                    <RegularList
                        items={category.child}
                        resourceName="category"
                        ItemComponent={SideCatItem}
                        itemProps={{ slug, searchParams, level: level + 1 }}
                    />
                )}
            </>
        )
    );
};

export default SideCatItem;
