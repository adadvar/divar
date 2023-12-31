import CitySearchBox from "./SearchBox";
import { city } from "@/public/interfaces";
import { getCities } from "@/app/actions/global-actions";
import RegularList from "../../RegularList";
import CityItem from "./CityItem";
import { useEffect, useState } from "react";
import { useGlobal } from "@/app/store/global-store";
import SubCityItem from "./SubCityItem";
import CityButton from "./CityButton";

export default function SelectOverlay() {
    const [selectedItem, setSeletedItem] = useState(0);
    const [selectedcities, setSeletedCities] = useState<city[]>([]);
    const [cities, setCities] = useState<city[]>([]);
    const subCities: any =
        selectedItem && cities.filter((c) => c.id === selectedItem)[0];
    const { typeDialog, setTypeDialog } = useGlobal();
    console.log(selectedcities);

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

    const handleItemSelection = (selectedItemId: number) => {
        setSeletedItem(selectedItemId);
    };

    const handleDeleteItem = (selectedItemId: number) => {
        let city: any = cities.find((c) => c.id === selectedItemId);
        if (!city)
            city = subCities.child.find((c: any) => c.id === selectedItemId);
        if (city) {
            setSeletedCities((prevItems) =>
                prevItems.filter((c) => c.id !== city.id)
            );
        }
    };

    const handleSubItemSelection = (
        selectedItemId: number,
        isChecked: boolean
    ) => {
        let city: any = cities.find((c) => c.id === selectedItemId);
        if (!city)
            city = subCities.child.find((c: any) => c.id === selectedItemId);
        if (city) {
            if (isChecked) {
                setSeletedCities((prevItems) => [...prevItems, city]);
            } else {
                setSeletedCities((prevItems) =>
                    prevItems.filter((c) => c.id !== city.id)
                );
            }
        }
    };

    return (
        <div className="fixed inset-0  min-h-[80%] max-h-[80%] bg-white m-auto rounded-md w-1/3 z-50">
            <div className="flex flex-col py-4 overflow-hidden h-full">
                <div className="flex flex-col gap-5 px-10">
                    <div className="flex justify-between">
                        <h1 className="text-gray-900 font-bold">انتخاب شهر</h1>
                        <button className="text-red-700 text-sm rounded-md px-2 py-1 hover:bg-red-50">
                            حذف همه
                        </button>
                    </div>
                    <div className="flex overflow-x-auto h-10 pb-2 pr-4 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20">
                        {selectedcities.length ? (
                            <RegularList
                                items={selectedcities}
                                resourceName="city"
                                ItemComponent={CityButton}
                                itemProps={{ onItemSelect: handleDeleteItem }}
                            />
                        ) : (
                            <p>حداقل یک شهر را انتخاب کنید.</p>
                        )}
                    </div>
                    <CitySearchBox />
                </div>
                <div className="h-1 mt-3 mb-1 left-0 right-0 shadow-sm"></div>
                <div className="overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10 mb-14">
                    {!subCities ? (
                        <RegularList
                            items={cities}
                            resourceName="city"
                            ItemComponent={CityItem}
                            itemProps={{ onItemSelect: handleItemSelection }}
                        />
                    ) : (
                        <RegularList
                            items={subCities.child}
                            resourceName="city"
                            ItemComponent={SubCityItem}
                            itemProps={{ onItemSelect: handleSubItemSelection }}
                        />
                    )}
                </div>
                <div className="absolute flex justify-around bottom-0 left-0 right-0 py-2 bg-white w-full shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                    <button
                        className="btn btn-ghost border text-gray-500 border-gray-600 w-[45%]"
                        onClick={() => setTypeDialog("")}
                    >
                        انصراف
                    </button>
                    <button className="btn btn-ghost bg-gray-200 text-gray-400 w-[45%]">
                        تایید
                    </button>
                </div>
            </div>
        </div>
    );
}
