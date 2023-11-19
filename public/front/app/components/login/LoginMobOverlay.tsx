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
} from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_REGISTER_USER_MOB } from "@/public/utils";
import MobOverlayLayout from "../mobOverlayLayout/MobOverlayLayout";
import Link from "next/link";
const LoginMobOverlay = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <MobOverlayLayout haveCloseButton title="ورود به حساب کاربری">
            <p className="text-gray-900 font-bold mx-4 mt-24 mb-7">
                شماره موبایل یا ایمیل و رمز عبور خود را وارد کنید{" "}
            </p>
            <p className="text-gray-500 text-sm mx-4 mb-2">
                برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل و
                رمزعبور خود را وارد کنید.
            </p>
            <form action="" className="p-4">
                <input
                    ref={inputRef}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    style={{ direction: "ltr" }}
                    className="border mb-4 p-2 outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="شماره موبایل یا ایمیل"
                />
                <input
                    type="password"
                    id="password"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="رمز عبور"
                />
            </form>

            <div className="flex justify-center flex-wrap p-4 text-sm text-gray-500">
                <span>اگر در دیوار حساب کاربری ندارید&nbsp;</span>
                <button
                    onClick={() =>
                        dispatch(openDialog(DIALOG_TYPE_REGISTER_USER_MOB))
                    }
                    className="text-red-700"
                >
                    ثبت نام کنید
                </button>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-2 bg-white w-full shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                <button className="btn btn-ghost w-full bg-red-700 text-white">
                    ورود
                </button>
            </div>
        </MobOverlayLayout>
    );
};

export default LoginMobOverlay;
