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
    const { isSuccess: isAuthSuccess } = useSelector(
        (state: RootState) => state.auth
    );
    const { isSuccess: isGlobalSuccess } = useSelector(
        (state: RootState) => state.global
    );
    const isSuccess = isAuthSuccess || isGlobalSuccess;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getHomeData({ page: 1 }));
    }, []);

    return (
        <>
            {!isSuccess && <Spinner />}
            <Overlay />
            <Navbar />
            <ButtomNavbar />
        </>
    );
};

export default LayoutContent;
