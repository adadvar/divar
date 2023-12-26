"use client";
import { useAuth } from "@/app/store/global-store";
import { category } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const SideCatItem = ({ category }: { category: category }) => {
    const { selectedCategory, setSelectedCategory } = useAuth();

    const IconComponent =
        category.icon && Icons[category.icon as keyof typeof Icons];
    if (category.parent_id === null) {
        return (
            <Link href={`/s/${category.slug}`} legacyBehavior>
                <a
                    className="flex items-center text-gray-400 hover:text-gray-600 my-2"
                    onClick={() => setSelectedCategory(category.slug)}
                >
                    <div className="text-2xl  p-1 rounded">
                        {category.icon && <IconComponent />}
                    </div>
                    <p className="text-sm my-1 font-bold">{category.title}</p>
                </a>
            </Link>
        );
    } else {
        return null;
    }
};

export default SideCatItem;
