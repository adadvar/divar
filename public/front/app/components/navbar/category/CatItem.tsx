import { BiChevronLeft as LeftIcon } from "react-icons/bi";
import * as Icons from "react-icons/bi";

interface Props {
    item: {
        id: number;
        title: string;
        slug: string;
        parent_id: number | null;
        icon: string;
    };
}

const CatItem = ({ item }: Props) => {
    return (
        <button className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2">
            <div className="text-2xl text-gray-400"></div>
            <p className="">{item.title}</p>
            <div className="text-2xl text-gray-400">
                <Icons.BiChevronLeft />
            </div>
        </button>
    );
};

export default CatItem;
