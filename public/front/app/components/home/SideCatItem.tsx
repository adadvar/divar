import { cat } from "@/public/interfaces";
import Link from "next/link";
import * as Icons from "react-icons/bi";

const SideCatItem = ({ cat }: { cat: cat }) => {
    const IconComponent = cat.icon && Icons[cat.icon as keyof typeof Icons];

    if (cat.parent_id === null) {
        return (
            <Link
                href="#"
                className="flex items-center text-gray-400 hover:text-gray-600 my-2"
            >
                <div className="text-2xl  p-1 rounded">
                    {cat.icon && <IconComponent />}
                </div>
                <p className="text-sm my-1 font-bold">{cat.title}</p>
            </Link>
        );
    } else {
        return null;
    }
};

export default SideCatItem;
