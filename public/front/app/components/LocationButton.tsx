import { BiMap as LocationIcon } from "react-icons/bi";

interface Props {
    text: string;
}

const LocationButton = ({ text }: Props) => {
    return (
        <button className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800">
            <div className="text-xl">
                <LocationIcon />
            </div>
            <span className="text-xs">{text}</span>
        </button>
    );
};

export default LocationButton;
