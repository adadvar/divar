import { category } from "@/public/interfaces";
import Link from "next/link";
import { BiBuildingHouse, BiCar, BiStore, BiHome } from "react-icons/bi";

const iconComponents: { [key: string]: any } = {
    BiBuildingHouse: BiBuildingHouse,
    BiCar: BiCar,
    BiStore: BiStore,
    BiHome: BiHome,
};
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
    if (!category) {
        return <LoadingPlaceholder />;
    }
    const Icon = category.icon && iconComponents[category.icon];

    if (category.parent_id === null) {
        return (
            <Link
                className="flex flex-col items-center"
                href={`/s/iran/${category.slug}`}
            >
                <div className="text-2xl text-red-700 bg-gray-100 p-1 rounded">
                    {category.icon && <Icon />}
                </div>
                <p className="text-xs text-gray-700 my-1">{category.title}</p>
            </Link>
        );
    } else {
        return null;
    }
};

export default MobCatItem;
