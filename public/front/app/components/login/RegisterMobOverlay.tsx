import { useRef, useEffect } from "react";
import { DIALOG_TYPE_LOGIN_MOB, isEmail } from "@/public/utils";
import MobOverlayLayout from "../MobOverlayLayout";
import Link from "next/link";
import { me, register } from "@/app/actions/auth-actions";
import { useGlobal } from "@/app/store/global-store";
const RegisterMobOverlay = () => {
    const { typeDialog, isSuccess, auth, setTypeDialog, setMe, setMessage } =
        useGlobal();

    const onRegister = async (formData: FormData) => {
        const input = formData.get("mobile_email");
        const isEmailInput = isEmail(input?.toString());
        const param = isEmailInput ? { email: input } : { mobile: input };
        const data1 = await register(param);
        if (data1) {
            setMessage(data1);
            setTypeDialog("");
        } else {
        }
    };

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

            <form action={onRegister} className="p-4">
                <input
                    type="text"
                    id="mobile_email"
                    name="mobile_email"
                    autoComplete="off"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="شماره موبایل یا ایمیل"
                    autoFocus
                />

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

                <div className="fixed inset-x-0 bottom-16 p-2 bg-white w-full">
                    <button className="btn btn-ghost w-full bg-red-700 text-white">
                        ادامه
                    </button>
                </div>
            </form>
        </MobOverlayLayout>
    );
};

export default RegisterMobOverlay;
