import CitySearchBox from "./SearchBox";
import { city } from "@/public/interfaces";
import { getCities } from "@/app/actions/global-actions";
import RegularList from "../../RegularList";
import CityItem from "./CityItem";
import { useEffect, useState } from "react";

export default function SelectOverlay() {
    const [cities, setCities] = useState<city[]>([]);

    useEffect(() => {
        const citiesData = localStorage.getItem("cities");
        if (citiesData) {
            setCities(JSON.parse(citiesData));
        } else {
            getCities().then((res) => {
                setCities(res);
                localStorage.setItem("cities", JSON.stringify(res));
            });
        }
    }, []);

    return (
        <div className="fixed inset-0 min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3 z-50">
            <div className="flex flex-col py-4 overflow-hidden h-full">
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                        <button className="text-red-700 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    </div>
                    <CitySearchBox />
                </div>
                <div className="h-1 mt-3 mb-1 left-0 right-0 shadow-sm"></div>
                <div className="overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10">
                    <RegularList
                        items={cities}
                        resourceName="city"
                        ItemComponent={CityItem}
                    />
                </div>
            </div>
        </div>
    );
}
