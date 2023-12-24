import { useRef, useEffect } from "react";

import { DIALOG_TYPE_REGISTER_USER_MOB } from "@/public/utils";
import MobOverlayLayout from "../MobOverlayLayout";
import { useGlobal } from "@/app/store/global-store";
import { login, me } from "@/app/actions/auth-actions";

const LoginMobOverlay = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isServer = typeof window === "undefined";
    const HOST_URL = isServer
        ? process.env.NEXT_PUBLIC_SERVER_API_URL
        : process.env.NEXT_PUBLIC_CLIENT_API_URL;

    const {
        typeDialog,
        isSuccess,
        auth,
        setTypeDialog,
        setAuth,
        setIsSuccess,
        setMe,
    } = useGlobal();

    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, []);

    const onLogin = async (formData: FormData) => {
        const username = formData.get("username");
        const password = formData.get("password");

        const data1 = await login({ username, password });
        if (data1) {
            setAuth(data1);
            setTypeDialog("");
            setIsSuccess(true);
            const data2 = await me(data1.access_token);
            setMe(data2);
        } else {
        }
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

                <div className="fixed inset-x-0 bottom-16 p-2 bg-white w-full">
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
