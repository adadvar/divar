"use client";
export const dynamic = "force-dynamic";
import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import RegularList from "../RegularList";
import AdvertItem from "./AdvertItem";
import { listAdverts } from "@/app/actions/advert-actions";

let page = 2;
const LoadMoreAdvert = () => {
    const isServer = typeof window === "undefined";
    const HOST_URL = isServer ? "http://nginx:80" : "http://localhost:8000";

    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);
    const [isCurrentPage, setIsCurrentPage] = useState(true);

    const listAdverts = async (params: any) => {
        const config = {
            method: "GET",
        };
        const response = await fetch(
            `http://localhost:8000/api/home-data?page=${params.page}`,
            config
        );
        const data = await response.json();

        return data;
    };

    useEffect(() => {
        listAdverts({ page }).then((res) => {
            res.last_page < page && setIsCurrentPage(false);
            setData([...data, ...res.adverts.data]);
        });
        page++;
    }, [inView, data]);

    return (
        <>
            {isCurrentPage && (
                <>
                    <div className="flex flex-wrap">
                        <RegularList
                            items={data}
                            resourceName="advert"
                            ItemComponent={AdvertItem}
                        />
                    </div>
                    <div ref={ref} className="text-center">
                        <SpinnerSvg />
                    </div>
                </>
            )}
        </>
    );
};

export default LoadMoreAdvert;
