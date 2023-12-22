"use client";
import logo from "@/public/logo.svg";
import logo_dark from "@/public/logo-dark.svg";

import Image from "next/image";
import Link from "next/link";
import { useGlobal } from "@/app/src/global-store";

const LogoBottom = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    const src =
        typeof typeDialog === "string"
            ? typeDialog == ""
                ? logo
                : logo_dark
            : "";

    return (
        <Link
            href="/"
            className="flex flex-col items-center px-2"
            onClick={() => setTypeDialog("")}
        >
            <Image src={src} width={25} height={25} alt=""></Image>
            <p
                className={`text-xs ${
                    typeDialog == "" ? "text-red-700" : "text-gray-800"
                } `}
            >
                آگهی ها
            </p>
        </Link>
    );
};

export default LogoBottom;
