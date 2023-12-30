import { city } from "@/public/interfaces";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";

const SubCityItem = ({
    city,
    onItemSelect,
}: {
    city: city;
    onItemSelect: (id: number) => void;
}) => {
    return (
        <button
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
            onClick={() => onItemSelect(city.id)}
        >
            <p className="">{city.name}</p>
            <div className="text-2xl text-gray-400">
                <input
                    type="checkbox"
                    className="w-5 h-5 border-gray-400 bg-transparent rounded-none"
                />
            </div>
        </button>
    );
};

export default SubCityItem;
