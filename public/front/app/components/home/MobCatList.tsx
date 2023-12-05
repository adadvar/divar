"use client";

import React from "react";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";
import MobCatItem from "./MobCatItem";
import { cat } from "@/public/interfaces";

const MobCatList = () => {
    const cats: cat[] = useSelector(
        (state: RootState) => state.global.data.categories
    );

    return (
        <div className="lg:hidden flex justify-around items-center mx-auto flex-wrap">
            {cats &&
                cats.map((cat, index) => {
                    if (cat.parent_id === null) {
                        return <MobCatItem key={cat.id} cat={cat} />;
                    } else {
                        return null;
                    }
                })}
        </div>
    );
};

export default MobCatList;
