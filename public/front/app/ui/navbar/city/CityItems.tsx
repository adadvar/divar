import React from "react";
import CityItem from "./CityItem";
import { city } from "@/public/interfaces";
import RegularList from "../../RegularList";
import { getCities } from "@/app/lib/data";

const CityItems = async () => {
    const cities: city[] = await getCities();
    return (
        <div className="pt-32 pb-16 overflow-x-hidden overflow-y-auto px-10">
            <RegularList
                items={cities}
                resourceName="cities"
                ItemComponent={CityItem}
                // itemProps={{ slug, searchParams, parentId: null }}
            />
        </div>
    );
};

export default CityItems;
