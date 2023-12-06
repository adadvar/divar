"use client";

import { data } from "@/public/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import ReqularList from "./components/RegularList";
import AdvertItem from "./components/home/AdvertItem";
import MobCatItem from "./components/home/MobCatItem";
import SideCatItem from "./components/home/SideCatItem";

export default function Home() {
    const data: data = useSelector((state: RootState) => state.global.data);
    return (
        <main className="">
            <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
                <ReqularList
                    items={data.categories}
                    resourceName="cat"
                    ItemComponent={MobCatItem}
                />
            </div>
            <div className="flex">
                <div className="lg:block w-[25%] flex flex-col pt-8 ps-3">
                    <p className="text-gray-800 text-xs font-bold pb-3">
                        دسته ها
                    </p>
                    <ReqularList
                        items={data.categories}
                        resourceName="cat"
                        ItemComponent={SideCatItem}
                    />
                </div>
                <div className="lg:w-[75%] w-full">
                    <div className="flex flex-wrap">
                        <p className="text-gray-700 w-full text-xs text-end pt-4 pb-3 px-2">
                            دیوار قم - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش
                            نو و دست دوم و کارکرده، استخدام و خدمات
                        </p>

                        <ReqularList
                            items={data.adverts}
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
