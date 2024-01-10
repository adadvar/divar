import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_REGISTER_VERIFY_USER, isEmail } from "@/app/lib/utils";
import Link from "next/link";
import { BiX as CloseIcon } from "react-icons/bi";
import { register } from "@/app/lib/actions";

const RegisterOverlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    const { auth, setAuth, setMe } = useAuth();
    const { setRes } = useTmp();

    const onRegister = async (formData: FormData) => {
        const input = formData.get("mobile_email");
        const isEmailInput = isEmail(input?.toString());
        const params = isEmailInput ? { email: input } : { mobile: input };
        const data1 = await register(params);
        if (data1) {
            setRes({ ...data1, params });
            setTypeDialog(DIALOG_TYPE_REGISTER_VERIFY_USER);
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
                    شماره موبایل یا ایمیل خود را وارد کنید
                </p>
                <p className="text-gray-500 text-sm mx-4 mb-2">
                    برای استفاده از امکانات دیوار لطفا شماره موبایل یا ایمیل خود
                    را وارد کنید کد تایید به این شماره یا ایمیل ارسال خواهد شد.
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

export default RegisterOverlay;
