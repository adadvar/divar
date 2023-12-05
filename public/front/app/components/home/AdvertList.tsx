"use client";

import { RootState } from "@/app/GlobalRedux/store";
import { advert } from "@/public/interfaces";
import React from "react";
import { useSelector } from "react-redux";
import AdvertItem from "./AdvertItem";

const AdvertList = () => {
    const adverts: advert[] = useSelector(
        (state: RootState) => state.global.data.adverts
    );
    return (
        <div className="flex flex-wrap">
            {adverts &&
                adverts.map((advert, index) => {
                    return <AdvertItem key={advert.id} advert={advert} />;
                })}
        </div>
    );
};

export default AdvertList;
