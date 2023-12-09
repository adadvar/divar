import { cat } from "@/public/interfaces";
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

const MobCatItem = ({ cat }: { cat: cat }) => {
    if (!cat) {
        return <LoadingPlaceholder />;
    }
    const IconComponent = cat.icon && Icons[cat.icon as keyof typeof Icons];

    if (cat.parent_id === null) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl text-red-700 bg-gray-100 p-1 rounded">
                    {cat.icon && <IconComponent />}
                </div>
                <p className="text-xs text-gray-700 my-1">{cat.title}</p>
            </div>
        );
    } else {
        return null;
    }
};

export default MobCatItem;
