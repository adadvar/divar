import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { city } from "@/public/interfaces";
import RegularList from "../../RegularList";
import CityItem from "./CityItem";
import { useEffect, useState } from "react";
import { useGlobal, useTmp } from "@/app/store/global-store";
import SubCityItem from "./SubCityItem";
import CityButton from "./CityButton";

export default function SelectOverlay() {
    const { selectedCities, cities, setSeletedCities } = useGlobal();
    const {
        parentCityId,
        tmpSelectedCities,
        setTypeDialog,
        clearTmpSelectedCities,
        setParentCityId,
        setTmpSeletedCities,
    } = useTmp();
    const [filteredItems, setFilteredItems] = useState<city[]>([]);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();

    const subCities: any =
        parentCityId && cities.filter((c: any) => c.id === parentCityId)[0];

    useEffect(() => {
        setTmpSeletedCities(selectedCities);
    }, []);

    const handleFilteredItems = (filtered: city[]) => {
        setFilteredItems(filtered);
    };

    const handleClick = () => {
        setTypeDialog("");
        setParentCityId(0);
        setSeletedCities(tmpSelectedCities);
        // clearSelectedCities();
        if (tmpSelectedCities.length > 1)
            params.set(
                "cities",
                tmpSelectedCities.map((city) => city.id).join(",")
            );
        if (tmpSelectedCities.length == 1) params.delete("cities");
        const url =
            tmpSelectedCities.length > 1
                ? `/s/iran`
                : tmpSelectedCities.length === 1
                ? `/s/${tmpSelectedCities[0].slug}`
                : "";

        replace(`${url}?${params.toString()}`);
    };

    return (
        <div className="fixed inset-0  min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3 z-50">
            <div className="flex flex-col py-4 overflow-hidden h-full">
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                        <button
                            className="text-red-700 text-sm rounded-md px-2 py-1 hover:bg-red-50"
                            onClick={() => clearTmpSelectedCities()}
                        >
                            حذف همه
                        </button>
                    </div>
                    <div className="flex overflow-x-auto h-10 pb-2 pr-4 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20">
                        {tmpSelectedCities.length ? (
                            <RegularList
                                items={tmpSelectedCities}
                                resourceName="city"
                                ItemComponent={CityButton}
                            />
                        ) : (
                            <p>حداقل یک شهر را انتخاب کنید.</p>
                        )}
                    </div>
                    {/* <CitySearchBox
                        items={cities}
                        setFilteredItems={handleFilteredItems}
                    /> */}
                </div>
                <div className="h-1 mt-3 mb-1 left-0 right-0 shadow-sm"></div>
                <div className="overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10 mb-14">
                    <button
                        className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 font-bold py-2"
                        onClick={() => {
                            clearTmpSelectedCities();
                            replace("/s/iran");
                            setTypeDialog("");
                            setParentCityId(0);
                        }}
                    >
                        همه شهرهای ایران
                    </button>
                    {!parentCityId ? (
                        <RegularList
                            items={cities}
                            resourceName="city"
                            ItemComponent={CityItem}
                        />
                    ) : (
                        <RegularList
                            items={subCities.child}
                            resourceName="city"
                            ItemComponent={SubCityItem}
                        />
                    )}
                </div>
                <div className=" flex justify-around bottom-0 left-0 right-0 py-2 bg-white w-full shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                    <button
                        className="btn btn-ghost border text-gray-500 border-gray-600 w-[45%]"
                        onClick={() => {
                            setTypeDialog("");
                            setParentCityId(0);
                            // clearSelectedCities();
                        }}
                    >
                        انصراف
                    </button>
                    <button
                        onClick={() => handleClick()}
                        className={`btn btn-ghost ${
                            tmpSelectedCities.length === 0
                                ? "bg-gray-200 text-gray-400 "
                                : "bg-red-800 text-white"
                        } w-[45%]`}
                        disabled={tmpSelectedCities.length === 0}
                    >
                        تایید
                    </button>
                </div>
            </div>
        </div>
    );
}
