"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./GlobalRedux/store";
import Navbar from "@/app/components/navbar/Index";
import Overlay from "@/app/components/Overlay";
import ButtomNavbar from "@/app/components/navbar/IndexBottom";
import Spinner from "@/app/components/Spinner";

const Content = () => {
    const { isLoading: isAuthLoading } = useSelector(
        (state: RootState) => state.auth
    );
    const { isLoading: isGlobalLoading } = useSelector(
        (state: RootState) => state.global
    );
    const isLoading = isAuthLoading || isGlobalLoading;
    return (
        <>
            {isLoading && <Spinner />}
            <Overlay />
            <Navbar />
            <ButtomNavbar />
        </>
    );
};

export default Content;
