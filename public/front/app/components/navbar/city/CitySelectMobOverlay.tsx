import CitySearchBox from "./CitySearchBox";
import CityItems from "./CityItems";
import { useDispatch } from "react-redux";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";

const CitySelectMobOverlay = () => {
    const dispatch = useDispatch();
    return (
        <div className="lg:hidden absolute top-0 left-0 right-0 bottom-0  bg-white m-auto rounded-md w-full h-screen z-50">
            <div className="flex flex-col space-y-3 pt-4 overflow-hidden h-full">
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                        <button className="text-red-900 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    </div>
                    <CitySearchBox />
                </div>
                <div className="h-1 left-0 right-0 shadow-sm"></div>
                <CityItems />
                <div className="navbar w-full flex justify-around shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                    <button
                        className="btn btn-ghost border text-gray-500 border-gray-600 w-[45%]"
                        onClick={() => dispatch(closeDialog())}
                    >
                        انصراف
                    </button>
                    <button className="btn btn-ghost bg-gray-200 text-gray-400 w-[45%]">
                        تایید
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CitySelectMobOverlay;
