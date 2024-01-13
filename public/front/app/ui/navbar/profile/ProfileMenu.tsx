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
import { useAuth, useGlobal, useTmp } from "@/app/store/global-store";
import { DIALOG_TYPE_LOGIN } from "@/app/lib/utils";

const ProfileMenu = () => {
    const { auth, me, setAuth, setMe } = useAuth();
    const { setTypeDialog, setProfMenuOpen } = useTmp();
    const isLogged = auth.token ? true : false;

    return (
        <div className="flex flex-col absolute p-2 w-60 right-0 shadow-md bg-white rounded">
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
                    onClick={() => {
                        setTypeDialog(DIALOG_TYPE_LOGIN);
                        setProfMenuOpen(false);
                    }}
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
            <hr className="pb-2 mt-2" />
            {isLogged && (
                <>
                    <CusProfButton
                        icon={<LogoutIcon />}
                        title="خروج"
                        onClick={() => {
                            setAuth({});
                            localStorage.removeItem("auth");
                            setTypeDialog("");
                            setProfMenuOpen(false);
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default ProfileMenu;
