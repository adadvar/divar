"use client";
import { advert, category, city } from "@/public/interfaces";
import React, { useEffect } from "react";
import { useGlobal } from "../store/global-store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Props {
    categories: category[];
    cities: city[];
}

const SetData = ({ categories, cities }: Props) => {
    const { setCities, setCategories } = useGlobal();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { setSeletedCities } = useGlobal();
    useEffect(() => {
        if (!params.has("cities")) setSeletedCities([]);
        setCities(cities);
        setCategories(categories);
    }, []);
    return <></>;
};
export default SetData;
