"use client";
import CityItems from "./CityItems";
import { useDispatch, useSelector } from "react-redux";
import MobOverlayLayout from "../../mobOverlayLayout/MobOverlayLayout";
import { useGlobal } from "@/app/store/auth-store";
const SelectMobOverlay = () => {
    const setTypeDialog = useGlobal.getState().setTypeDialog;

    return (
        <MobOverlayLayout title="انتخاب شهر" haveClearButton haveSearchInput>
            <CityItems />
            <div className="fixed flex justify-around bottom-0 left-0 right-0 py-2 bg-white w-full shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                <button
                    className="btn btn-ghost border text-gray-500 border-gray-600 w-[45%]"
                    onClick={() => setTypeDialog("")}
                >
                    انصراف
                </button>
                <button className="btn btn-ghost bg-gray-200 text-gray-400 w-[45%]">
                    تایید
                </button>
            </div>
        </MobOverlayLayout>
    );
};

export default SelectMobOverlay;
