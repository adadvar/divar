import React, { useState } from "react";
import { city } from "@/public/interfaces";
import { useGlobal, useTmp } from "@/app/store/global-store";

const SubCityItem = ({ city }: { city: city }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { tmpSelectedCities, addTmpSeletedCities, deleteTmpSeletedCities } =
        useTmp();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        !isChecked ? addTmpSeletedCities(city) : deleteTmpSeletedCities(city);
    };
    const handleChecked = tmpSelectedCities.find((c) => c.id == city.id)
        ? true
        : false;

    return (
        <button
            className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2"
            onClick={handleCheckboxChange}
        >
            <p className="">{city.name}</p>
            <div className="">
                <input
                    type="checkbox"
                    checked={handleChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="w-5 h-5"
                ></input>
            </div>
        </button>
    );
};

export default SubCityItem;
