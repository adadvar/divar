"use client";
import {
    BsBoxArrowInLeft as LoginIcon,
    BsPin as PinIcon,
    BsReceiptCutoff as NoteIcon,
    BsArrowCounterclockwise as RecentIcon,
    BsShopWindow as ShopIcon,
    BsPerson as PersonIcon,
    BsShieldCheck as CheckIcon,
    BsNewspaper as MyadIcon,
    BsBoxArrowRight as LogoutIcon,
} from "react-icons/bs";

import CusProfButton from "../../CusProfButton";
import { useAuth, useGlobal } from "@/app/store/global-store";
import { DIALOG_TYPE_LOGIN } from "@/public/utils";

const ProfileMenu = () => {
    const { typeDialog, setTypeDialog } = useGlobal();
    const { auth, me, setAuth, setMe } = useAuth();
    const isLogged = auth.access_token ? true : false;

    return (
        <div className="flex flex-col absolute p-2 w-60 right-0 shadow-md bg-white">
            {isLogged ? (
                <>
                    <CusProfButton icon={<PersonIcon />} title="کاربر دیوار" />
                    {me.mobile && (
                        <p className="ps-6 text-xs text-gray-400">
                            {"تلفن : " + me.mobile.replace("+98", "0")}
                        </p>
                    )}
                    {me.email && (
                        <p className="ps-6 text-xs text-gray-400">
                            {"ایمیل : " + me.email}
                        </p>
                    )}
                </>
            ) : (
                <CusProfButton
                    icon={<LoginIcon />}
                    title="ورود"
                    onClick={() => setTypeDialog(DIALOG_TYPE_LOGIN)}
                />
            )}
            <hr className="pb-2 mt-2" />
            {isLogged && (
                <>
                    <CusProfButton icon={<CheckIcon />} title="تایید هویت" />
                    <hr className="pb-2 mt-2" />
                    <CusProfButton icon={<MyadIcon />} title="آگهی های من" />
                    <hr className="pb-2 mt-2" />
                </>
            )}
            <CusProfButton icon={<PinIcon />} title="نشان ها" />
            <hr className="pb-2 mt-2" />
            <CusProfButton icon={<NoteIcon />} title="یادداشت ها" />
            <hr className="pb-2 mt-2" />
            <CusProfButton icon={<RecentIcon />} title="بازدیدهای اخیر" />
            <hr className="pb-2 mt-2" />
            {isLogged && (
                <>
                    <CusProfButton icon={<PersonIcon />} title="رزومه من" />
                    <hr className="pb-2 mt-2" />
                </>
            )}
            <CusProfButton icon={<ShopIcon />} title="دیوار برای کسب و کارها" />
            {isLogged && (
                <>
                    <CusProfButton
                        icon={<LogoutIcon />}
                        title="خروج"
                        onClick={() => {
                            setAuth({});
                            localStorage.removeItem("auth");
                            setTypeDialog("");
                        }}
                    />
                    <hr className="pb-2 mt-2" />
                </>
            )}
        </div>
    );
};

export default ProfileMenu;
