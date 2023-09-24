import { useDispatch } from "react-redux";
import { closeSearch } from "../GlobalRedux/features/global/globalSlice";

interface Props {
    top: number;
    left: number;
    isOpen: boolean;
}

const Overlay = ({ top, left, isOpen }: Props) => {
    const dispatch = useDispatch();

    return (
        <div
            className={`w-full h-[calc(100vh-66px)] absolute bottom-0 left-[${left}px] bg-black ${
                isOpen ? "opacity-30" : "opacity-0"
            } overflow-auto transition duration-300 ease-in-out`}
            onClick={() => dispatch(closeSearch())}
        ></div>
    );
};

export default Overlay;
