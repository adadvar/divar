import { openCity } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { BiMap as LocationIcon } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    text: string;
}

const CityButton = ({ text }: Props) => {
    const isCityOpen = useSelector(
        (state: RootState) => state.global.isCityOpen
    );
    const dispatch = useDispatch();

    return (
        <button
            className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
            onClick={() => dispatch(openCity())}
        >
            <div className="text-xl">
                <LocationIcon />
            </div>
            <span className="text-xs">{text}</span>
        </button>
    );
};

export default CityButton;
