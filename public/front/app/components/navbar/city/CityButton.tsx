import { city } from "@/public/interfaces";
import { BiX as CloseIcon } from "react-icons/bi";

const CityButton = ({
    city,
    onItemSelect,
}: {
    city: city;
    onItemSelect: (id: number) => void;
}) => {
    return (
        <div className="flex text-xs p-1 ms-1 rounded-full items-center font-bold bg-pink-50 border border-red-700">
            <p className="text-red-800 mx-2 my-1">{city.name}</p>
            <button
                className="text-sm font-bold text-red-800 p-1 hover:bg-red-100 rounded-full"
                onClick={() => onItemSelect(city.id)}
            >
                <CloseIcon />
            </button>
        </div>
    );
};

export default CityButton;
