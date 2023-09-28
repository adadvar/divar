import React from "react";
import CatItem from "./CatItem";

const CityItems = () => {
    const cats = [
        {
            id: 1,
            title: "املاک",
            slug: "amlak",
            parent_id: null,
            icon: "BiChevronLeft",
        },
        {
            id: 2,
            title: "وسایل نقلیه",
            slug: "osayl-nklyh",
            parent_id: null,
            icon: "BiChevronLeft",
        },
        {
            id: 5,
            title: "فروش مسکونی",
            slug: "frosh-mskony",
            parent_id: 1,
            icon: "BiChevronLeft",
        },
        {
            id: 6,
            title: "اجاره مسکونی",
            slug: "agarh-mskony",
            parent_id: 1,
            icon: "BiChevronLeft",
        },
    ];

    return (
        <div className="relative h-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10">
            {cats.map((c) => (
                <CatItem item={c} />
            ))}
        </div>
    );
};

export default CityItems;
