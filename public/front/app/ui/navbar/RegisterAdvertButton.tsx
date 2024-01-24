import { cookies } from "next/headers";
import Link from "next/link";
import SetTypeDialog from "./setTypeDialog";
import { DIALOG_TYPE_LOGIN } from "@/app/lib/utils";

const RegisterAdvertButton = () => {
    const cookie: any = cookies().get("token");
    const token = cookie && JSON.parse(cookie.value);
    return (
        <div className="btn btn-ghost btn-hover text-white bg-red-700 hover:bg-red-600">
            {!!token ? (
                <Link href={"/new"} className="">
                    <span className="text-xs">ثبت آگهی</span>
                </Link>
            ) : (
                <SetTypeDialog text={"ثبت آگهی"} type={DIALOG_TYPE_LOGIN} />
            )}
        </div>
    );
};

export default RegisterAdvertButton;
