import React, { useState } from "react";
import { city } from "@/public/interfaces";

const SubCityItem = ({
    city,
    onItemSelect,
}: {
    city: city;
    onItemSelect: (id: number, is: boolean) => void;
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onItemSelect(city.id, !isChecked);
    };

    return (
        <div className="flex justify-between items-center w-full text-gray-800 border-b border-gray-200 py-2">
            <p className="">{city.name}</p>
            <div className="">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5"
                ></input>
            </div>
        </div>
    );
};

export default SubCityItem;
