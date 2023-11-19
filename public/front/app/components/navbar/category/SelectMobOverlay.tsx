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
import MobOverlayLayout from "../../mobOverlayLayout/MobOverlayLayout";

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
                        child: [
                            {
                                id: 7,
                                title: "فروش آپارتمان",
                                slug: "frosh-aparteman",
                                parent_id: 5,
                                icon: null,
                                child: [],
                            },
                            {
                                id: 8,
                                title: "فروش خانه و ویلا",
                                slug: "frosh-khaneovila",
                                parent_id: 5,
                                icon: null,
                                child: [],
                            },
                        ],
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
        <MobOverlayLayout
            title={title}
            haveCloseButton
            haveBackButton={selectedCat != 0}
        >
            <div className="mt-16">
                <CatItems cats={child} />
            </div>
        </MobOverlayLayout>
    );
};

export default SelectMobOverlay;
