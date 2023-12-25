"use client";
import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import RegularList from "../RegularList";
import AdvertItem from "./AdvertItem";
import { listAdverts } from "@/app/actions/advert-actions";

let page = 2;
const LoadMoreAdvert = ({
    last_page,
    price,
}: {
    last_page: number;
    price: string;
}) => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);

    useEffect(() => {
        if (inView && page <= last_page) {
            listAdverts({ page, price }).then((res) => {
                setData([...data, ...res.data]);
            });
            page++;
        }
    }, [inView]);

    useEffect(() => {
        page = 2;
        setData([]);
    }, [price]);

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
