"use client";

import { data } from "@/public/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import RegularList from "./components/RegularList";
import AdvertItem from "./components/home/AdvertItem";
import MobCatItem from "./components/home/MobCatItem";
import SideCatItem from "./components/home/SideCatItem";
import SidePriceFilter from "./components/home/SidePriceFilter";

export default function Home() {
    const data: data = useSelector((state: RootState) => state.global.data);
    const isDataLoaded = data && data.adverts && data.categories;

    return (
        <main className="">
            <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
                <RegularList
                    items={data.categories}
                    resourceName="cat"
                    ItemComponent={MobCatItem}
                />
            </div>
            <div className="flex justify-between">
                <div className="lg:flex w-[23%] hidden flex-col pt-8 px-3">
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
                </div>
                <div className="lg:w-[75%] w-full">
                    <div className="flex flex-wrap">
                        <p className="text-gray-700 w-full text-xs text-end pt-4 pb-3 px-2">
                            دیوار قم - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش
                            نو و دست دوم و کارکرده، استخدام و خدمات
                        </p>

                        <RegularList
                            items={
                                isDataLoaded
                                    ? data.adverts
                                    : Array(20).fill(null)
                            }
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
