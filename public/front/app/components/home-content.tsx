import React from "react";
import RegularList from "@/app/components/RegularList";
import SidePriceFilter from "@/app/components/home/SidePriceFilter";
import SideStatusFilter from "@/app/components/home/SideStatusFilter";
import SideLinks from "@/app/components/home/SideLinks";
import LoadMoreAdvert from "@/app/components/home/LoadMoreAdvert";
import SideCatItem from "@/app/components/home/SideCatItem";
import MobCatItem from "@/app/components/home/MobCatItem";
import AdvertItem from "@/app/components/home/AdvertItem";
import SideSubCatItem from "./home/SideSubCatItem";
import { findCategory } from "@/public/utils";
import Link from "next/link";
import { BsArrowRightShort as BackIcon } from "react-icons/bs";

type Props = {
    adverts: any;
    categories: any;
    price: string;
    slug: string[];
};

const HomeContent = ({ adverts, categories, price, slug }: Props) => {
    const isDataLoaded = adverts && categories ? true : false;
    const subCategory = findCategory(categories, "slug", slug[0])
        ? findCategory(categories, "slug", slug[0])?.child
        : [];
    return (
        <div className="">
            <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
                <RegularList
                    items={isDataLoaded ? categories : Array(4).fill(null)}
                    resourceName="category"
                    ItemComponent={MobCatItem}
                />
            </div>
            <div className="relative mx-auto">
                <div className="lg:flex flex-col fixed top-20 bottom-0 overflow-y-auto scrollbar-none w-[280px] hidden pt-8 px-5">
                    <p className="text-gray-800 text-xs font-bold pb-3">
                        دسته ها
                    </p>

                    {slug.length && slug[0] ? (
                        <Link
                            href={"/"}
                            className="flex text-gray-400 hover:text-gray-600 my-2"
                        >
                            <div className="text-2xl p-1 rounded">
                                <BackIcon />
                            </div>
                            <p className="text-sm my-1 font-bold">
                                همه آگهی ها
                            </p>
                        </Link>
                    ) : null}

                    <RegularList
                        items={categories}
                        resourceName="category"
                        ItemComponent={SideCatItem}
                        itemProps={{ slug }}
                    />
                    <RegularList
                        items={subCategory}
                        resourceName="category"
                        ItemComponent={SideSubCatItem}
                        itemProps={{ slug }}
                    />
                    <hr />
                    <SidePriceFilter />
                    <hr />
                    <SideStatusFilter />
                    <hr />
                    <SideLinks />
                </div>
                <div className="lg:ms-[280px] overflow-hidden scrollbar-none">
                    <p className="text-gray-700 w-full text-xs text-end pt-4 pb-3 px-2">
                        دیوار قم - نیازمندی‌ های رایگان، آگهی‌های خرید، فروش نو
                        و دست دوم و کارکرده، استخدام و خدمات
                    </p>
                    <div className="flex flex-wrap">
                        <RegularList
                            items={
                                isDataLoaded
                                    ? adverts.data
                                    : Array(21).fill(null)
                            }
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                    {isDataLoaded && (
                        <LoadMoreAdvert
                            last_page={adverts.last_page}
                            price={price}
                            slug={slug}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
