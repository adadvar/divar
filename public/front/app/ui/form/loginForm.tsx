"use client";

import { login } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
    const { replace } = useRouter();
    const onLogin = async (formData: FormData) => {
        const result = await login(formData);
        if (result?.message) {
            toast.error(result.message);
        } else {
            toast.success("با موفقیت وارد شدید.");
            replace("/admin/dashboard");
        }
    };
    return (
        <form
            action={onLogin}
            className="bg-bgSoft p-12 rounded-lg w-[500px] h-[500px] flex flex-col justify-center items-center gap-7"
        >
            <h1 className="text-5xl">Login</h1>
            <input
                name="username"
                type="text"
                placeholder="username"
                className="w-full p-5 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
            />
            <input
                name="password"
                type="password"
                placeholder="password"
                className="w-full p-5 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
            />
            <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 ">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
