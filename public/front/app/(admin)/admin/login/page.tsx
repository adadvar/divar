import LoginForm from "@/app/ui/form/loginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
    // const isAuthenticated = cookies().has("token");
    // console.log("isAuthenticated", isAuthenticated);
    // isAuthenticated && redirect("/admin/dashboard");
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
