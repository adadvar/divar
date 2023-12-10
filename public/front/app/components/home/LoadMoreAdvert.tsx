"use client";

import { useInView } from "react-intersection-observer";
import SpinnerSvg from "../SpinnerSvg";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
import { getHomeData } from "@/app/GlobalRedux/features/global/globalSlice";
import { useSelector } from "react-redux";
import { data } from "@/public/interfaces";

let page = 2;
const LoadMoreAdvert = () => {
    const dispatch = useAppDispatch();
    const { ref, inView } = useInView();
    const data: data = useSelector((state: RootState) => state.global.data);
    const isCurrentPage = data.last_advert >= page;
    useEffect(() => {
        if (inView && isCurrentPage) {
            dispatch(getHomeData({ page: page }));
            page++;
        }
    }, [inView]);

    return (
        <div ref={ref} className="text-center">
            {isCurrentPage && <SpinnerSvg />}
        </div>
    );
};

export default LoadMoreAdvert;
