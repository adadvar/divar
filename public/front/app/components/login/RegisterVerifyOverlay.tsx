import { BiX as CloseIcon } from "react-icons/bi";

import Link from "next/link";
import {
    login,
    me,
    register,
    registerVerify,
} from "@/app/actions/auth-actions";
import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
const RegisterVerifyOverlay = () => {
    const { setTypeDialog } = useGlobal();
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

            const data2 = await login(params);
            setAuth(data2);
            setTypeDialog("");
        } else {
        }
    };

    return (
        <div className="fixed flex flex-col inset-0 min-h-[450px] max-h-[450px] min-w-[500px] max-w-[500px] bg-white m-auto text-gray-500 rounded-md z-50">
            <div className="flex items-center justify-between w-full p-7">
                <p className="font-bold text-lg text-black">
                    ایجاد حساب کاربری
                </p>
                <button
                    className="text-3xl text-gray-500 p-1 hover:bg-gray-100 hover:text-gray-700 rounded-full"
                    onClick={() => {
                        setTypeDialog("");
                    }}
                >
                    <CloseIcon />
                </button>
            </div>
            <div className="h-1 left-0 right-0 shadow-md border-b"></div>
            <div className="relative p-7">
                <p className="text-gray-900 font-bold m-4">
                    کد تایید خود را وارد کنید
                </p>
                <p className="text-gray-500 text-sm mx-4 mb-2">
                    برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل خود
                    را وارد کنید کد تایید به این شماره یا ایمیل ارسال خواهد شد.
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

                    <div className="p-2 bg-white w-full">
                        <button className="btn btn-ghost w-full bg-red-700 text-white">
                            ادامه
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterVerifyOverlay;
