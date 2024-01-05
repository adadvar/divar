"use client";
import { MouseEvent, ReactNode } from "react";

import {
    BsBoxArrowInLeft as LoginIcon,
    BsPin as PinIcon,
    BsReceiptCutoff as NoteIcon,
    BsArrowCounterclockwise as RecentIcon,
    BsShopWindow as ShopIcon,
    BsPencil as RuleIcon,
    BsInfoCircle as InfoIcon,
    BsDownload as DownloadIcon,
    BsLifePreserver as SupportIcon,
    BsPerson as PersonIcon,
    BsShieldCheck as CheckIcon,
    BsNewspaper as MyadIcon,
    BsBoxArrowRight as LogoutIcon,
} from "react-icons/bs";
import {
    BiLogoInstagramAlt as InstaIcon,
    BiLogoTwitter as TwitterIcon,
    BiLogoLinkedinSquare as LinkedinIcon,
} from "react-icons/bi";

import { DIALOG_TYPE_LOGIN_MOB } from "@/public/utils";
import MobOverlayLayout from "../../MobOverlayLayout";
import Link from "next/link";
import { useAuth, useGlobal } from "@/app/store/global-store";
import { logout } from "@/app/actions/auth-actions";

const ProfileMobOverlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    const { auth, me, setAuth, setMe } = useAuth();
    const isLogged = auth.access_token ? true : false;

    return (
        <MobOverlayLayout title="دیوار من" haveBottomNav>
            <div className="flex flex-col py-16">
                {!isLogged && (
                    <p className="text-gray-800 text-sm px-3 py-4">
                        برای استفاده از تمام امکانات دیوار وارد حساب خود شوید.
                    </p>
                )}
                <div className="px-6 text-gray-600 text-sm">
                    {isLogged ? (
                        <>
                            <div className="flex items-center w-full p-2">
                                <PersonIcon />
                                <p className="ps-2">کاربر دیوار</p>
                            </div>
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
                        <CustomButton
                            icon={<LoginIcon />}
                            title="ورود و ثبت نام"
                            onClick={() => setTypeDialog(DIALOG_TYPE_LOGIN_MOB)}
                        />
                    )}
                    <hr className="pb-2 mt-2" />
                    {isLogged && (
                        <>
                            <CustomButton
                                icon={<CheckIcon />}
                                title="تایید هویت"
                            />
                            <hr className="pb-2 mt-2" />
                        </>
                    )}
                    {isLogged && (
                        <CustomButton icon={<MyadIcon />} title="آگهی های من" />
                    )}

                    <CustomButton icon={<PinIcon />} title="نشان ها" />
                    <CustomButton icon={<NoteIcon />} title="یادداشت ها" />
                    <CustomButton
                        icon={<RecentIcon />}
                        title="بازدیدهای اخیر"
                    />

                    {isLogged && (
                        <CustomButton icon={<PersonIcon />} title="رزومه من" />
                    )}
                    <hr className="pb-2 mt-2" />

                    <CustomButton
                        icon={<ShopIcon />}
                        title="دیوار برای کسب و کارها"
                    />

                    <hr className="pb-2 mt-2" />
                    {isLogged && (
                        <>
                            <CustomButton
                                icon={<LogoutIcon />}
                                title="خروج"
                                onClick={async () => {
                                    setAuth({});
                                    localStorage.removeItem("global");
                                    setTypeDialog("");
                                }}
                            />
                            <hr className="pb-2 mt-2" />
                        </>
                    )}
                    <CustomButton icon={<RuleIcon />} title="قوانین" />
                    <CustomButton icon={<InfoIcon />} title="درباره دیوار" />

                    <hr className="pb-2 mt-2" />
                    <CustomButton
                        icon={<DownloadIcon />}
                        title="دریافت برنامه"
                    />
                    <CustomButton icon={<SupportIcon />} title="پشتیبانی" />
                </div>
                <div className="flex flex-1 justify-center items-center text-gray-600">
                    <SocialButton icon={<TwitterIcon />} />
                    <SocialButton icon={<InstaIcon />} />
                    <SocialButton icon={<LinkedinIcon />} />
                </div>
            </div>
        </MobOverlayLayout>
    );
};

type CustomButtonProps = {
    icon: ReactNode;
    title: string;
    linkTo?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const CustomButton = ({ icon, title, linkTo, onClick }: CustomButtonProps) => {
    if (linkTo) {
        return (
            <Link
                href={linkTo}
                className="flex items-center hover:bg-gray-200 w-full p-2 rounded"
            >
                {icon}
                <p className="ps-2">{title}</p>
            </Link>
        );
    } else {
        return (
            <button
                className="flex items-center hover:bg-gray-200 w-full p-2 rounded"
                onClick={onClick}
            >
                {icon}
                <p className="ps-2">{title}</p>
            </button>
        );
    }
};

type SocialButtonProps = {
    icon: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const SocialButton = ({ icon, onClick }: SocialButtonProps) => {
    return (
        <button
            className="text-lg hover:bg-gray-200 p-2 rounded-full ms-2"
            onClick={onClick}
        >
            {icon}
        </button>
    );
};

export default ProfileMobOverlay;
