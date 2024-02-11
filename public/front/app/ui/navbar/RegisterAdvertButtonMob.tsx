"use client";

import { BiSolidPlusCircle as AddIcon } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_LOGIN_MOB } from "@/app/lib/utils";

const RegisterAdvertButtonMob = () => {
    const pathname = usePathname();
    const { auth } = useAuth();
    const { setTypeDialog } = useTmp();
    const isLogged = !!auth;

    return (
        <div
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                pathname === "/new" ? "text-red-700" : "text-gray-800"
            }`}
        >
            {isLogged ? (
                <Link href={"/new"}>
                    <AddIcon className="text-xl m-auto" />
                    <p className="text-xs">ثبت آگهی</p>
                </Link>
            ) : (
                <button onClick={() => setTypeDialog(DIALOG_TYPE_LOGIN_MOB)}>
                    <AddIcon className="text-xl m-auto" />
                    <p className="text-xs">ثبت آگهی</p>
                </button>
            )}
        </div>
    );
};

export default RegisterAdvertButtonMob;
