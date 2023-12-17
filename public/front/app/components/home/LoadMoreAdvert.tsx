"use client";

import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect, useState } from "react";
import { advert, data } from "@/public/interfaces";
import advertActions from "@/app/actions/advert-actions";

let page = 2;
const LoadMoreAdvert = () => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<advert[]>([]);
    const [isCurrentPage, setIsCurrentPage] = useState(true);

    useEffect(() => {
        advertActions.list({ page }).then((res) => {
            res.last_page < page && setIsCurrentPage(false);
            setData([...data, ...res.adverts.data]);
        });
        page++;
    }, [inView, data]);

    return (
        <div ref={ref} className="text-center">
            {isCurrentPage && <SpinnerSvg />}
        </div>
    );
};

export default LoadMoreAdvert;
