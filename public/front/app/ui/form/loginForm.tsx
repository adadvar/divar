"use client";

import { useFormStatus } from "react-dom";
import { login } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import LoginButton from "../buttons/login-button";

const LoginForm = () => {
    const { replace, refresh } = useRouter();
    const { pending } = useFormStatus();
    const onLogin = async (formData: FormData) => {
        const result = await login(formData);
        if (result?.message) {
            toast.error(result.message);
        } else {
            toast.success("با موفقیت وارد شدید.");
            replace("/admin/dashboard");
            // refresh();
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
            <LoginButton />
        </form>
    );
};

export default LoginForm;
