import { login } from "@/app/lib/actions";
import { me } from "@/app/lib/data";
import { cookies } from "next/headers";
const LoginPage = () => {
    // const { auth, setAuth, setMe } = useAuth();
    // const { push } = useRouter();
    const onLogin = async (formData: FormData) => {
        "use server";
        const username = formData.get("username");
        const password = formData.get("password");
        const data1 = await login({ username, password });
        // if (data1) {
        // setAuth(data1);
        // console.log(data1);
        // setMe(data2);
        // push("/admin/dashboard");
        console.log(data1.access_token);
        cookies().delete("token");
        cookies().delete("me");
        cookies().set("token", JSON.stringify(data1));
        const data2 = await me(data1.access_token);
        cookies().set("me", JSON.stringify(data2));
        // } else {
        // }
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
