import { cat } from "@/public/interfaces";
import * as Icons from "react-icons/bi";

const MobCatItem = ({ cat }: { cat: cat }) => {
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
