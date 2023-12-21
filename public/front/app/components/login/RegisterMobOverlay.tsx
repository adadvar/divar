"use client";
import { useRef, useEffect } from "react";
import { DIALOG_TYPE_LOGIN_MOB, DIALOG_TYPE_PROFILE_MOB } from "@/public/utils";
import MobOverlayLayout from "../MobOverlayLayout";
import Link from "next/link";
const RegisterMobOverlay = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <MobOverlayLayout
            haveBackButton
            haveCloseButton
            whereBack={DIALOG_TYPE_LOGIN_MOB}
            title="ایجاد حساب کاربری"
        >
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

            <div className="flex justify-center flex-wrap p-4 text-sm text-gray-500">
                <Link href={""} className="text-red-700">
                    شرایط استفاده از خدمات
                </Link>
                <span>&nbsp;و&nbsp;</span>
                <Link href={""} className="text-red-700">
                    حریم خصوصی
                </Link>
                <span>&nbsp;دیوار را می پذیرم.</span>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-2 bg-white w-full shadow-[rgba(0,0,0,0.1)_0px_-2px_5px]">
                <button className="btn btn-ghost w-full bg-red-700 text-white">
                    ادامه
                </button>
            </div>
        </MobOverlayLayout>
    );
};

export default RegisterMobOverlay;
