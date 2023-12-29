import React from "react";
import CityItem from "./CityItem";
import { getCities } from "@/app/actions/global-actions";
import { city } from "@/public/interfaces";
import RegularList from "../../RegularList";

const CityItems = async () => {
    const cities: city[] = await getCities();
    console.log(cities);
    return (
        <div className="pt-32 pb-16 overflow-x-hidden overflow-y-auto px-10">
            <RegularList
                items={cities}
                resourceName="cities"
                ItemComponent={CityItem}
                itemProps={{ slug, searchParams, parentId: null }}
            />
        </div>
    );
};

export default CityItems;
