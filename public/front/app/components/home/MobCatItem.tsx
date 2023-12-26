"use client";
import { useAuth } from "@/app/store/global-store";
import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const LoadingPlaceholder = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="animate-pulse w-8 h-8 text-2xl  bg-gray-100 p-1 rounded">
                {/* Placeholder for icon */}
            </div>
            <div className="h-4 bg-gray-100 rounded w-20 animate-pulse my-1"></div>{" "}
            {/* Placeholder for title */}
        </div>
    );
};

const MobCatItem = ({ category }: { category: category }) => {
    const { setSelectedCategory } = useAuth();
    if (!category) {
        return <LoadingPlaceholder />;
    }
    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];

    if (category.parent_id === null) {
        return (
            <Link legacyBehavior href={`/s/${category.slug}`}>
                <a
                    className="flex flex-col items-center"
                    onClick={() => setSelectedCategory(category.slug)}
                >
                    <div className="text-2xl text-red-700 bg-gray-100 p-1 rounded">
                        {category.icon && <IconComponent />}
                    </div>
                    <p className="text-xs text-gray-700 my-1">
                        {category.title}
                    </p>
                </a>
            </Link>
        );
    } else {
        return null;
    }
};

export default MobCatItem;
