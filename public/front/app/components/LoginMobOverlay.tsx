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
const LoginMobOverlay = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="lg:hidden flex flex-col absolute top-0 left-0 right-0 bottom-0  bg-white m-auto rounded-md w-full h-full z-50">
            <div className="flex justify-between text-gray-800 text-sm font-bold shadow-sm p-4">
                <div className="flex items-center">
                    <p className="text-gray-900 font-bold">
                        ورود به حساب کاربری
                    </p>
                </div>
                <button
                    className="text-gray-600 bg-gray-200  rounded-full font-semibold hover:bg-gray-300 p-2"
                    onClick={() =>
                        dispatch(openDialog(DIALOG_TYPE_PROFILE_MOB))
                    }
                >
                    <CloseIcon />
                </button>
            </div>
            <p className="text-gray-900 font-bold mx-4 my-7">
                شماره موبایل یا ایمیل خود را وارد کنید{" "}
            </p>
            <p className="text-gray-500 text-sm mx-4 mb-2">
                برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل خود را
                وارد کنید کد تایید به این شماره یا ایمیل ارسال خواهد شد.
            </p>
            <input
                ref={inputRef}
                type="text"
                id="first_name"
                className="border p-2 mx-4 outline-none text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                placeholder="شماره موبایل یا ایمیل"
            />
        </div>
    );
};

export default LoginMobOverlay;
