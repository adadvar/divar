"use client";
import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import RegularList from "../RegularList";
import AdvertItem from "./AdvertItem";

let page = 2;
const LoadMoreAdvert = ({ last_page }: { last_page: number }) => {
    const isServer = typeof window === "undefined";
    const HOST_URL = isServer
        ? process.env.NEXT_PUBLIC_SERVER_API_URL
        : process.env.NEXT_PUBLIC_CLIENT_API_URL;

    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);

    const getHomeData = async (params: any) => {
        const config = {
            method: "GET",
        };
        const response = await fetch(
            `${HOST_URL}/home-data?page=${params.page}`,
            config
        );
        const data = await response.json();

        return data;
    };

    useEffect(() => {
        if (inView && page <= last_page) {
            getHomeData({ page }).then((res) => {
                setData([...data, ...res.adverts.data]);
            });
            console.log({ page: page, last_page });
            page++;
        }
    }, [inView]);

    return (
        <>
            <div className="flex flex-wrap">
                <RegularList
                    items={data}
                    resourceName="advert"
                    ItemComponent={AdvertItem}
                />
            </div>
            <div ref={ref} className="text-center">
                {page <= last_page && <SpinnerSvg />}
            </div>
        </>
    );
};

export default LoadMoreAdvert;
