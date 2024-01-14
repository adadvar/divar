"use client";
import { category, city } from "@/public/interfaces";
import React, { useEffect } from "react";
import { useAuth, useGlobal } from "../store/global-store";
import { useSearchParams } from "next/navigation";
interface Props {
    categories: category[];
    cities: city[];
    token: string;
    me: any;
}

const SetData = ({ categories, cities, token, me }: Props) => {
    const { setCities, setCategories } = useGlobal();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { setSeletedCities } = useGlobal();
    const { setAuth, setMe } = useAuth();
    useEffect(() => {
        if (!params.has("cities")) setSeletedCities([]);
        setCities(cities);
        setCategories(categories);
        setAuth(token);
        setMe(me);
    }, []);
    return <></>;
};
export default SetData;
