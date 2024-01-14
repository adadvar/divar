import { login } from "@/app/lib/actions";
import { me } from "@/app/lib/data";
import LoginForm from "@/app/ui/form/loginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { toast } from "react-toastify";
const LoginPage = () => {
    // const notify = (msg: string) => toast(msg);
    const onLogin = async (formData: FormData) => {
        "use server";
        const data = await login(formData);
        // notify(data1);
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
