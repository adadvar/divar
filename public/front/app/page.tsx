import RegularList from "./components/RegularList";
import AdvertItem from "./components/home/AdvertItem";
import MobCatItem from "./components/home/MobCatItem";
import SideCatItem from "./components/home/SideCatItem";
import SidePriceFilter from "./components/home/SidePriceFilter";
import LoadMoreAdvert from "./components/home/LoadMoreAdvert";
import SideStatusFilter from "./components/home/SideStatusFilter";
import SideLinks from "./components/home/SideLinks";
import { getHomeData } from "./actions/global-actions";
import { useGlobal } from "@/app/store/global-store";

export default async function Home() {
    const isServer = typeof window === "undefined";
    const HOST_URL = isServer
        ? process.env.NEXT_PUBLIC_SERVER_API_URL
        : process.env.NEXT_PUBLIC_CLIENT_API_URL;
    const response = await fetch(`${HOST_URL}/home-data?page=1`);
    const data = await response.json();
    const isDataLoaded = data && data.adverts && data.categories ? true : false;
    const typeDialog = useGlobal.getState().typeDialog;
    if (typeDialog) return null;
    return (
        <div className="">
            <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
                <RegularList
                    items={isDataLoaded ? data.categories : Array(4).fill(null)}
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
                        items={isDataLoaded && data.categories}
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
                                    ? data.adverts.data
                                    : Array(21).fill(null)
                            }
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                    {isDataLoaded && (
                        <LoadMoreAdvert last_page={data.adverts.last_page} />
                    )}
                </div>
            </div>
        </div>
    );
}
