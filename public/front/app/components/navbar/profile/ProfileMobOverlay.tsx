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
} from "react-icons/bs";
import {
    BiLogoInstagramAlt as InstaIcon,
    BiLogoTwitter as TwitterIcon,
    BiLogoLinkedinSquare as LinkedinIcon,
} from "react-icons/bi";

import { RootState } from "@/app/GlobalRedux/store";
import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { DIALOG_TYPE_LOGIN_MOB } from "@/public/utils";
import MobOverlayLayout from "../../MobOverlayLayout";

const ProfileMobOverlay = () => {
    const dispatch = useDispatch();

    return (
        <MobOverlayLayout title="دیوار من" haveBottomNav>
            <div className="flex flex-col py-16">
                <p className="text-gray-800 text-sm px-3 py-4">
                    برای استفاده از تمام امکانات دیوار وارد حساب خود شوید.
                </p>
                <div className="px-6 text-gray-600 text-sm">
                    <button
                        className="flex items-center hover:bg-gray-200 w-full p-2 rounded"
                        onClick={() =>
                            dispatch(openDialog(DIALOG_TYPE_LOGIN_MOB))
                        }
                    >
                        <LoginIcon />
                        <p className="ps-2">ورود و ثبت نام</p>
                    </button>
                    <hr className="pb-2 mt-2" />
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <PinIcon />
                        <p className="ps-2">نشان ها</p>
                    </button>
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <NoteIcon />
                        <p className="ps-2">یادداشت ها</p>
                    </button>
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <RecentIcon />
                        <p className="ps-2">بازدیدهای اخیر</p>
                    </button>
                    <hr className="pb-2 mt-2" />
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <ShopIcon />
                        <p className="ps-2">دیوار برای کسب و کارها</p>
                    </button>
                    <hr className="pb-2 mt-2" />
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <RuleIcon />
                        <p className="ps-2">قوانین</p>
                    </button>
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <InfoIcon />
                        <p className="ps-2">درباره دیوار</p>
                    </button>
                    <hr className="pb-2 mt-2" />
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <DownloadIcon />
                        <p className="ps-2">دریافت برنامه</p>
                    </button>
                    <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                        <SupportIcon />
                        <p className="ps-2">پشتیبانی</p>
                    </button>
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

export default ProfileMobOverlay;
