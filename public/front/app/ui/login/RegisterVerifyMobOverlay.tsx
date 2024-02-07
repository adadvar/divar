import { DIALOG_TYPE_LOGIN_MOB } from "@/app/lib/utils";
import MobOverlayLayout from "../MobOverlayLayout";
import Link from "next/link";

import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
import { login, registerVerify } from "@/app/lib/actions";
const RegisterVerifyMobOverlay = () => {
    const { setTypeDialog } = useTmp();
    const { setAuth, setMe } = useAuth();
    const { res } = useTmp();

    const onVerify = async (formData: FormData) => {
        const code = formData.get("code");
        const data1 = await registerVerify({ code, ...res.params });
        if (data1) {
            setMe(data1);
            const isEmail = data1.email != null;
            const params = isEmail
                ? { username: data1.email, password: data1.email }
                : {
                      username: data1.mobile,
                      password: data1.mobile.replace("+98", "0"),
                  };
            const fd = new FormData();
            fd.append("username", params.username);
            fd.append("password", params.password);
            const data2 = await login(fd);
            setAuth(data2);
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
                کد تایید خود را وارد کنید.{" "}
            </p>
            <p className="text-gray-500 text-sm mx-4 mb-2">
                برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل خود را
                وارد کنید کد تایید به این شماره یا ایمیل ارسال خواهد شد.
            </p>

            <form action={onVerify} className="p-4">
                <input
                    type="text"
                    id="code"
                    name="code"
                    autoComplete="off"
                    className="border p-2  outline-none w-full text-sm rounded-lg text-gray-900 bg-white   focus:border-red-500"
                    placeholder="کد تایید"
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

export default RegisterVerifyMobOverlay;
