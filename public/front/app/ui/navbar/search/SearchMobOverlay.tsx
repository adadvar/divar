"use client";
import { useRef, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrowAlt as RightIcon } from "react-icons/bi";
import MobOverlayLayout from "../../MobOverlayLayout";
import { useGlobal, useTmp } from "@/app/store/global-store";

const SearchMobOverlay = () => {
    const { typeDialog, setTypeDialog } = useTmp();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <MobOverlayLayout haveBackButton haveInput>
            <></>
        </MobOverlayLayout>
    );
};

export default SearchMobOverlay;
