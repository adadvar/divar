import { login } from "@/app/lib/actions";
import { me } from "@/app/lib/data";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { toast } from "react-toastify";
const LoginPage = () => {
    // const notify = (msg: string) => toast(msg);
    const onLogin = async (formData: FormData) => {
        "use server";

        const data = await login(formData);
        // notify(data1);
        cookies().delete("token");
        cookies().delete("me");
        console.log(data);
        cookies().set("token", JSON.stringify(data.token));
        cookies().set("me", JSON.stringify(data.user));
        redirect("/admin/dashboard");
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
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
        </div>
    );
};

export default LoginPage;
