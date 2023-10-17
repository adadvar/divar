"use client";

import logo from "@/public/logo.svg";
import logo_dark from "@/public/logo-dark.svg";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import Image from "next/image";
import Link from "next/link";

const LogoBottom = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();

    const src =
        typeof typeOpenDialog === "string"
            ? typeOpenDialog == ""
                ? logo
                : logo_dark
            : "";

    return (
        <Link
            href="/"
            className="flex flex-col items-center px-2"
            onClick={() => dispatch(closeDialog())}
        >
            <Image src={src} width={25} height={25} alt=""></Image>
            <p
                className={`text-xs ${
                    typeOpenDialog == "" ? "text-red-700" : "text-gray-800"
                } `}
            >
                آگهی ها
            </p>
        </Link>
    );
};

export default LogoBottom;
