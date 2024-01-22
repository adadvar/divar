"use client";
import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import RegularList from "../RegularList";
import AdvertItem from "./AdvertItem";
import { listAdverts } from "@/app/lib/data";
import { ImSpinner2 } from "react-icons/im";

let page = 2;
const LoadMoreAdvert = ({
    last_page,
    searchParams,
    slug,
}: {
    last_page: number;
    searchParams: { [key: string]: string | string[] | undefined };
    slug?: string[];
}) => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);

    useEffect(() => {
        if (inView && page <= last_page) {
            listAdverts({ page, ...searchParams, slug }).then((res) => {
                setData([...data, ...res.data]);
            });
            page++;
        }
    }, [inView]);

    useEffect(() => {
        page = 2;
        setData([]);
    }, [searchParams, slug]);

    return (
        <>
            <div className="flex flex-wrap">
                <RegularList
                    items={data}
                    resourceName="advert"
                    ItemComponent={AdvertItem}
                />
            </div>
            <div
                ref={ref}
                className="flex items-center justify-center text-center"
            >
                {page <= last_page && (
                    <ImSpinner2 className="animate-spin h-12 w-12" />
                )}
            </div>
        </>
    );
};

export default LoadMoreAdvert;
<SpinnerSvg />;
