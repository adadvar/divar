import RegularList from "@/app/components/RegularList";
import AdvertItem from "@/app/components/home/AdvertItem";
import MobCatItem from "@/app/components/home/MobCatItem";
import SideCatItem from "@/app/components/home/SideCatItem";
import SidePriceFilter from "@/app/components/home/SidePriceFilter";
import LoadMoreAdvert from "@/app/components/home/LoadMoreAdvert";
import SideStatusFilter from "@/app/components/home/SideStatusFilter";
import SideLinks from "@/app/components/home/SideLinks";
import { useAuth, useGlobal } from "@/app/store/global-store";
import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";

export default async function Home({
    searchParams,
    params,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { slug: string[] };
}) {
    const price = searchParams.price ? searchParams.price.toString() : "0";

    const adverts = await listAdverts({ page: 1, price, slug: params.slug });

    const categories = await listCategories();

    const isDataLoaded = adverts && categories ? true : false;
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
                    <RegularList
                        items={categories}
                        resourceName="category"
                        ItemComponent={SideCatItem}
                    />
                    <hr />
                    <SidePriceFilter />
                    <hr />
                    <SideStatusFilter />
                    <hr />
                    <SideLinks />
                    <hr />
                    <SidePriceFilter />
                    <hr />
                    <SideStatusFilter />
                    <hr />
                    <SideLinks />
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
                            slug={params.slug}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
