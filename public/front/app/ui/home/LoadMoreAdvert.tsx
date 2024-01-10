"use client";
import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import RegularList from "../RegularList";
import AdvertItem from "./AdvertItem";
import { listAdverts } from "@/app/lib/data";

let page = 2;
const LoadMoreAdvert = ({
    last_page,
    queryParams,
    slug,
}: {
    last_page: number;
    queryParams: { [key: string]: string | string[] | undefined };
    slug?: string[];
}) => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);

    useEffect(() => {
        if (inView && page <= last_page) {
            listAdverts({ page, ...queryParams, slug }).then((res) => {
                setData([...data, ...res.data]);
            });
            page++;
        }
    }, [inView]);

    useEffect(() => {
        page = 2;
        setData([]);
    }, [queryParams, slug]);

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
