import React from "react";
import { useFormStatus } from "react-dom";
import { ImSpinner2 } from "react-icons/im";
const LoginButton = () => {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <button
                    disabled
                    className="w-full flex justify-center p-6 text-text border-none rounded-md bg-teal-500 "
                >
                    <ImSpinner2 className="animate-spin h-6 w-6" />
                </button>
            ) : (
                <button
                    disabled={pending}
                    className="w-full p-6 text-text border-none rounded-md bg-teal-500 "
                >
                    Login
                </button>
            )}
        </>
    );
};

export default LoginButton;
