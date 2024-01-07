"use client";
import { advert, category, city } from "@/public/interfaces";
import React, { useEffect } from "react";
import { useGlobal } from "../store/global-store";
interface Props {
    categories: category[];
    cities: city[];
}

const SetData = ({ categories, cities }: Props) => {
    const { setCities, setCategories } = useGlobal();
    useEffect(() => {
        setCities(cities);
        setCategories(categories);
    }, []);
    return <></>;
};
export default SetData;
