import { city } from "@/public/interfaces";
import { BiChevronLeft as LeftIcon } from "react-icons/bi";

const CityItem = ({ city }: { city: city }) => {
    return (
        <button className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2">
            <p className="">{city.name}</p>
            <div className="text-2xl text-gray-400">
                <LeftIcon />
            </div>
        </button>
    );
};

export default CityItem;
