"use client";
import { useRef, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { BiRightArrowAlt as RightIcon } from "react-icons/bi";
import MobOverlayLayout from "../../mobOverlayLayout/MobOverlayLayout";

const SearchMobOverlay = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const dispatch = useDispatch();
    return (
        <MobOverlayLayout haveBackButton haveInput>
            <></>
        </MobOverlayLayout>
    );
};

export default SearchMobOverlay;
