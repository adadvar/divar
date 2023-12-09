"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./GlobalRedux/store";
import Navbar from "@/app/components/navbar/Index";
import Overlay from "@/app/components/Overlay";
import ButtomNavbar from "@/app/components/navbar/IndexBottom";
import Spinner from "@/app/components/Spinner";
import { getHomeData } from "./GlobalRedux/features/global/globalSlice";

const LayoutContent = () => {
    const { isLoading: isAuthLoading } = useSelector(
        (state: RootState) => state.auth
    );
    const { isLoading: isGlobalLoading } = useSelector(
        (state: RootState) => state.global
    );
    const isLoading = isAuthLoading || isGlobalLoading;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHomeData({ page: 1 }));
    }, []);

    return (
        <>
            {/* {isLoading && <Spinner />} */}
            <Overlay />
            <Navbar />
            <ButtomNavbar />
        </>
    );
};

export default LayoutContent;
