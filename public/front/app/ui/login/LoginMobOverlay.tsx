import { DIALOG_TYPE_REGISTER_USER_MOB } from "@/app/lib/utils";
import MobOverlayLayout from "../MobOverlayLayout";
import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
import { login } from "@/app/lib/actions";
import { me } from "@/app/lib/data";
import toast from "react-hot-toast";

const LoginMobOverlay = () => {
    const { typeDialog, setTypeDialog } = useTmp();

    const onLogin = async (formData: FormData) => {
        const result = await login(formData);
        if (result?.message) {
            toast.error(result.message);
        } else {
            toast.success("با موفقیت وارد شدید.");
            setTypeDialog("");
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
                    type="text"
                    id="username"
                    name="username"
                    autoComplete="off"
                    autoFocus
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
