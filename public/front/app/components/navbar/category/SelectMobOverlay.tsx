"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CatItems from "../category/CatItems";
import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import {
    closeDialog,
    setCats,
    setselectedCat,
} from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { cat } from "@/public/interfaces";
import { findCat } from "@/public/utils";

const SelectMobOverlay = () => {
    const global = useSelector((state: RootState) => state.global);
    const selectedCat = global.selectedCat;
    const dispatch = useDispatch();

    const parent = findCat(global.cats, selectedCat);
    const title = selectedCat ? parent.title : "انتخاب دسته بندی";
    const child = selectedCat
        ? findCat(global.cats, selectedCat)["child"]
        : global.cats;

    useEffect(() => {
        const cats: cat[] = [
            {
                id: 1,
                title: "املاک",
                slug: "amlak",
                parent_id: null,
                icon: "BiBuildingHouse",
                child: [
                    {
                        id: 5,
                        title: "فروش مسکونی",
                        slug: "frosh-mskony",
                        parent_id: 1,
                        icon: null,
                        child: [],
                    },
                    {
                        id: 6,
                        title: "اجاره مسکونی",
                        slug: "agarh-mskony",
                        parent_id: 1,
                        icon: null,
                        child: [],
                    },
                ],
            },
            {
                id: 2,
                title: "وسایل نقلیه",
                slug: "osayl-nklyh",
                parent_id: null,
                icon: "BiCar",
                child: [],
            },
        ];
        dispatch(setCats(cats));
    }, []);

    return (
        <div className="lg:hidden absolute top-0 left-0 right-0 bottom-[66px]  bg-white m-auto rounded-md w-full h-[calc(100vh-66px)] z-50">
            <div className="flex flex-col pt-4 overflow-hidden h-full">
                <div className="flex justify-between px-4">
                    <div className="flex">
                        <button onClick={() => dispatch(setselectedCat(0))}>
                            <BackIcon />
                        </button>
                        <h1 className="text-gray-900 font-bold">{title}</h1>
                    </div>
                    <button
                        className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                        onClick={() => dispatch(closeDialog())}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="h-1 left-0 right-0 shadow-sm"></div>
                <CatItems cats={child} />
            </div>
        </div>
    );
};

export default SelectMobOverlay;
