"use client";
import { useRef, useEffect } from "react";

import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
    closeDialog,
    openDialog,
} from "../GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_PROFILE_MOB } from "@/public/utils";
import MobOverlayLayout from "./MobOverlayLayout";
const LoginMobOverlay = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <MobOverlayLayout haveCloseButton title="ورود به حساب کاربری">
            <p className="text-gray-900 font-bold mx-4 mt-24 mb-7">
                شماره موبایل یا ایمیل خود را وارد کنید{" "}
            </p>
            <p className="text-gray-500 text-sm mx-4 mb-2">
                برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل خود را
                وارد کنید کد تایید به این شماره یا ایمیل ارسال خواهد شد.
            </p>
            <form action="" className="p-4">
                <input
                    ref={inputRef}
                    type="text"
                    id="first_name"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="شماره موبایل یا ایمیل"
                />
            </form>
        </MobOverlayLayout>
    );
};

export default LoginMobOverlay;
