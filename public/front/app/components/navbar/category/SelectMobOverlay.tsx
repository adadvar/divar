import { useDispatch } from "react-redux";
import CatItems from "../category/CatItems";
import { BsXLg as CloseIcon } from "react-icons/bs";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";

const SelectMobOverlay = () => {
    const dispatch = useDispatch();
    return (
        <div className="lg:hidden absolute top-0 left-0 right-0 bottom-[66px]  bg-white m-auto rounded-md w-full h-[calc(100vh-66px)] z-50">
            <div className="flex flex-col pt-4 overflow-hidden h-full">
                <div className="flex justify-between px-4">
                    <h1 className="text-gray-900 font-bold">
                        انتخاب دسته بندی
                    </h1>
                    <button
                        className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                        onClick={() => dispatch(closeDialog())}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-1 left-0 right-0 shadow-sm"></div>
                <CatItems />
            </div>
        </div>
    );
};

export default SelectMobOverlay;
