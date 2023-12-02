"use client";
import { useRef, useEffect, useState } from "react";

import {
    BsXLg as CloseIcon,
    BsArrowRightShort as BackIcon,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    closeDialog,
    getHomeData,
    openDialog,
} from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_REGISTER_USER_MOB } from "@/public/utils";
import MobOverlayLayout from "../mobOverlayLayout/MobOverlayLayout";
import Link from "next/link";
import { login, me } from "@/app/GlobalRedux/features/auth/authSlice";
import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
const LoginMobOverlay = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { token, isLoading, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );

    useEffect(() => {
        inputRef.current?.focus();

        if (isSuccess) {
            dispatch(me());
            dispatch(getHomeData());
            dispatch(closeDialog());
        }
    }, [isSuccess]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    };

    return (
        <MobOverlayLayout haveCloseButton title="ورود به حساب کاربری">
            <p className="text-gray-900 font-bold mx-4 mt-24 mb-7">
                شماره موبایل یا ایمیل و رمز عبور خود را وارد کنید{" "}
            </p>
            <p className="text-gray-500 text-sm mx-4 mb-2">
                برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل و
                رمزعبور خود را وارد کنید.
            </p>
            <form onSubmit={onSubmit} className="p-4">
                <input
                    ref={inputRef}
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    style={{ direction: "ltr" }}
                    className="border mb-4 p-2 outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="شماره موبایل یا ایمیل"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="رمز عبور"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />

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
                    <button
                        type="submit"
                        className="btn btn-ghost w-full bg-red-700 text-white"
                    >
                        ورود
                    </button>
                </div>
            </form>
        </MobOverlayLayout>
    );
};

export default LoginMobOverlay;
