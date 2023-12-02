"use client";
import { useDispatch, useSelector } from "react-redux";
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

import { RootState, useAppDispatch } from "@/app/GlobalRedux/store";
import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_LOGIN_MOB } from "@/public/utils";
import MobOverlayLayout from "../../mobOverlayLayout/MobOverlayLayout";
import { ReactNode } from "react";

const ProfileMobOverlay = () => {
    const { token, me, isLoading, isSuccess } = useSelector(
        (state: RootState) => state.auth
    );

    const isLogged = token || isSuccess;
    const dispatch = useAppDispatch();

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
                            <p className="ps-6 text-xs text-gray-400">
                                {"تلفن : " + me.mobile.replace("+98", "0")}
                            </p>
                            <p className="ps-6 text-xs text-gray-400">
                                {"ایمیل : " + me.email}
                            </p>
                        </>
                    ) : (
                        <button
                            className="flex items-center hover:bg-gray-200 w-full p-2 rounded"
                            onClick={() =>
                                dispatch(openDialog(DIALOG_TYPE_LOGIN_MOB))
                            }
                        >
                            <LoginIcon />
                            <p className="ps-2">ورود و ثبت نام</p>
                        </button>
                    )}
                    <hr className="pb-2 mt-2" />
                    {isLogged && (
                        <CustomButton icon={<CheckIcon />} title="تایید هویت" />
                    )}
                    <hr className="pb-2 mt-2" />
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
                        <CustomButton icon={<LogoutIcon />} title="خروج" />
                    )}
                    <hr className="pb-2 mt-2" />
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
                    <button className="text-lg hover:bg-gray-200 p-2 rounded-full ms-2">
                        <TwitterIcon />
                    </button>
                    <button className="text-lg hover:bg-gray-200 p-2 rounded-full ms-2">
                        <InstaIcon />
                    </button>
                    <button className="text-lg hover:bg-gray-200 p-2 rounded-full ms-2">
                        <LinkedinIcon />
                    </button>
                </div>
            </div>
        </MobOverlayLayout>
    );
};

const CustomButton = ({ icon, title }: { icon: ReactNode; title: string }) => {
    return (
        <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
            {icon}
            <p className="ps-2">{title}</p>
        </button>
    );
};

export default ProfileMobOverlay;
