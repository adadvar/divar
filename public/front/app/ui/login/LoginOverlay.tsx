import { login, me } from "@/app/actions/auth-actions";
import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_REGISTER_USER } from "@/public/utils";
import { BiX as CloseIcon } from "react-icons/bi";

const LoginOverlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();
    const { auth, setAuth, setMe } = useAuth();

    const onLogin = async (formData: FormData) => {
        const username = formData.get("username");
        const password = formData.get("password");

        const data1 = await login({ username, password });
        if (data1) {
            setAuth(data1);
            setTypeDialog("");
            const data2 = await me(data1.access_token);
            setMe(data2);
        } else {
        }
    };
    return (
        <div className="fixed flex flex-col inset-0 min-h-[450px] max-h-[450px] min-w-[500px] max-w-[500px] bg-white m-auto text-gray-500 rounded-md z-50">
            <div className="flex items-center justify-between w-full p-7">
                <p className="font-bold text-lg text-black">
                    ورود به حساب کاربری
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
            <div className="p-7">
                <p className="font-bold text-md text-black my-5">
                    شماره موبایل یا ایمیل و رمز عبور خود را وارد کنید
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
                                setTypeDialog(DIALOG_TYPE_REGISTER_USER)
                            }
                            className="text-red-700"
                        >
                            ثبت نام کنید
                        </button>
                    </div>

                    <div className=" p-2 bg-white w-full">
                        <button
                            type="submit"
                            className="btn btn-ghost w-full bg-red-700 text-white"
                        >
                            ورود
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginOverlay;
