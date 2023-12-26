"use client";

import React from "react";
import RegularList from "../RegularList";
import SidePriceFilter from "./SidePriceFilter";
import SideStatusFilter from "./SideStatusFilter";
import SideLinks from "./SideLinks";
import SideCatItem from "./SideCatItem";

const Sidebar = ({ categories }: { categories: any }) => {
    return (
        <div className="lg:flex flex-col fixed top-20 bottom-0 overflow-y-auto scrollbar-none w-[280px] hidden pt-8 px-5">
            <p className="text-gray-800 text-xs font-bold pb-3">دسته ها</p>

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
    );
};

export default Sidebar;
