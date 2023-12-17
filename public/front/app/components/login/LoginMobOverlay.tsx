"use client";
import { useRef, useEffect, useState } from "react";

import { DIALOG_TYPE_REGISTER_USER_MOB } from "@/public/utils";
import MobOverlayLayout from "../mobOverlayLayout/MobOverlayLayout";
import { useGlobal } from "@/app/store/global-store";
import authActions from "@/app/actions/auth-actions";

const LoginMobOverlay = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const typeDialog = useGlobal.getState().typeDialog;
    const setTypeDialog = useGlobal.getState().setTypeDialog;

    useEffect(() => {
        inputRef.current?.focus();

        // if (isSuccess) {
        //     authActions.me();
        //     dispatch(getHomeData({ page: 1 }));
        //     dispatch(closeDialog());
        // }
    }, []);

    const onLogin = async (formData: FormData) => {
        const username = formData.get("username");
        const password = formData.get("password");
        await authActions.login({ username, password });
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
            <form action={onLogin} className="p-4">
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
                    name="password"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="رمز عبور"
                />

                <div className="flex justify-center flex-wrap p-4 text-sm text-gray-500">
                    <span>اگر در دیوار حساب کاربری ندارید&nbsp;</span>
                    <button
                        onClick={() =>
                            setTypeDialog(DIALOG_TYPE_REGISTER_USER_MOB)
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
