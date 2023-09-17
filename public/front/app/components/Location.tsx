import { BiMap as LocationIcon } from "react-icons/bi";

interface Props {
    text: string;
}

const Location = ({ text }: Props) => {
    return (
        <button className="btn btn-ghost text-2xl">
            <LocationIcon />
            <span>{text}</span>
        </button>
    );
};

export default Location;
