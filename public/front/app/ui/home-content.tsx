import React from "react";
import RegularList from "@/app/ui/RegularList";
import SidePriceFilter from "@/app/ui/home/SidePriceFilter";
import SideStatusFilter from "@/app/ui/home/SideStatusFilter";
import SideLinks from "@/app/ui/home/SideLinks";
import LoadMoreAdvert from "@/app/ui/home/LoadMoreAdvert";
import SideCatItem from "@/app/ui/home/SideCatItem";
import MobCatItem from "@/app/ui/home/MobCatItem";
import AdvertItem from "@/app/ui/home/AdvertItem";
import { findCategory, findParentCategoryBySlug } from "@/app/lib/utils";
import Link from "next/link";
import { BsArrowRightShort as BackIcon } from "react-icons/bs";
import SideCat from "./home/SideCat";

type Props = {
    adverts: any;
    categories: any;
    searchParams: { [key: string]: string | string[] | undefined };
    slug: string[];
};

const HomeContent = ({ adverts, categories, searchParams, slug }: Props) => {
    const isDataLoaded = adverts && categories ? true : false;

    const category =
        slug && slug[1] && findCategory(categories, "slug", slug[1]);

    const parentCategory =
        slug && slug[1] && findParentCategoryBySlug(categories, slug[1]);

    let witchViewCategory = "";
    if (!parentCategory) {
        witchViewCategory = "sub";
    }
    if (category && parentCategory) {
        witchViewCategory = "subsub";
    }
    console.log(witchViewCategory);

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

                    {slug && slug[1] ? (
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

                    {parentCategory && (
                        <SideCat
                            category={parentCategory}
                            slug={slug}
                            searchParams={searchParams}
                        />
                    )}
                    {category && (
                        <SideCat
                            category={category}
                            slug={slug}
                            searchParams={searchParams}
                            marginStart={
                                witchViewCategory == "subsub" ? "ms-10" : ""
                            }
                        />
                    )}
                    <RegularList
                        items={category ? category?.child : categories}
                        resourceName="category"
                        ItemComponent={SideCatItem}
                        itemProps={{ slug, searchParams, witchViewCategory }}
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
                            searchParams={searchParams}
                            slug={slug}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;
