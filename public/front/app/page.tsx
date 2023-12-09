"use client";

import { data } from "@/public/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import RegularList from "./components/RegularList";
import AdvertItem from "./components/home/AdvertItem";
import MobCatItem from "./components/home/MobCatItem";
import SideCatItem from "./components/home/SideCatItem";
import SidePriceFilter from "./components/home/SidePriceFilter";
import LoadMoreAdvert from "./components/LoadMoreAdvert";
import SideStatusFilter from "./components/home/SideStatusFilter";
import SideLinks from "./components/home/SideLinks";

export default function Home() {
    const data: data = useSelector((state: RootState) => state.global.data);
    const isDataLoaded =
        data && data.adverts.length && data.categories.length ? true : false;

    return (
        <main className="">
            <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
                <RegularList
                    items={isDataLoaded ? data.categories : Array(4).fill(null)}
                    resourceName="cat"
                    ItemComponent={MobCatItem}
                />
            </div>
            <div className="relative">
                <div className="lg:flex flex-col fixed top-3 right-0 bottom-0 sidebar w-[280px] hidden pt-8 px-5">
                    <p className="text-gray-800 text-xs font-bold pb-3">
                        دسته ها
                    </p>
                    <RegularList
                        items={data.categories}
                        resourceName="cat"
                        ItemComponent={SideCatItem}
                    />
                    <hr />
                    <SidePriceFilter />
                    <hr />
                    <SideStatusFilter />
                    <hr />
                    <SideLinks />
                </div>
                <div className="ms-[280px]">
                    <p className="text-gray-700 w-full text-xs text-end pt-4 pb-3 px-2">
                        دیوار قم - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو
                        و دست دوم و کارکرده، استخدام و خدمات
                    </p>
                    <div className="flex flex-wrap">
                        <RegularList
                            items={
                                isDataLoaded
                                    ? data.adverts
                                    : Array(21).fill(null)
                            }
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                    <LoadMoreAdvert />
                </div>
            </div>
        </main>
    );
}
