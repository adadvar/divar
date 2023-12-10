"use client";

import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
import { useEffect } from "react";
import { showAdvert } from "@/app/GlobalRedux/features/advert/advertSlice";
import { findCategoryPath } from "@/public/utils";
import CategoryPath from "./CategoryPath";

const Advert = ({ slug_url }: { slug_url: string }) => {
    const { advert } = useSelector((state: RootState) => state.advert);
    const { categories } = useSelector((state: RootState) => state.global.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(showAdvert({ slug_url: slug_url }));
    }, []);

    const childId = advert && advert.category_id;
    const foundPath = findCategoryPath(categories, childId);

    return <div>{foundPath && <CategoryPath path={foundPath} />}</div>;
};

export default Advert;
