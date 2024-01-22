"use client";

import Link from "next/link";

const RegisterAdvertButton = () => {
    return (
        <Link
            href={"/new"}
            className="btn btn-ghost btn-hover text-white bg-red-700 hover:bg-red-600"
        >
            <span className="text-xs">ثبت آگهی</span>
        </Link>
    );
};

export default RegisterAdvertButton;
