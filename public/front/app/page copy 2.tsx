// Home.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import RegularList from "./components/RegularList";
import AdvertItem from "./components/home/AdvertItem";
import MobCatItem from "./components/home/MobCatItem";
import SideCatItem from "./components/home/SideCatItem";
import SidePriceFilter from "./components/home/SidePriceFilter";
import { data } from "@/public/interfaces";

export default function Home() {
    const data: data = useSelector((state: RootState) => state.global.data);
    const isDataLoaded = data && data.adverts && data.categories;

    const [allAdverts, setAllAdverts] = useState(data.adverts && []);
    const [displayedAdverts, setDisplayedAdverts] = useState([]);
    // Number of adverts to be displayed with every "load more"
    const advertsPerPage = 20;
    const observer = useRef<IntersectionObserver | null>(null);

    console.log(data);
    // Function to load more adverts
    const loadMoreAdverts = () => {
        setDisplayedAdverts((prevAdverts) =>
            allAdverts.slice(0, prevAdverts.length + advertsPerPage)
        );
    };

    // IntersectionObserver callback
    const intersectionCallback: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting) {
            loadMoreAdverts();
        }
    };

    useEffect(() => {
        // Initialize observer on mount
        const options: IntersectionObserverInit = {
            root: null, // observing the element in relation to the viewport
            rootMargin: "0px",
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver(
            intersectionCallback,
            options
        );

        // Start observing the placeholder element
        const currentElement = document.querySelector(".loading-placeholder");
        if (currentElement) {
            observer.current.observe(currentElement);
        }

        // Load initial "page" of adverts
        isDataLoaded && loadMoreAdverts();

        // Cleanup observer on unmount
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

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
                                    ? data.adverts.data
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
