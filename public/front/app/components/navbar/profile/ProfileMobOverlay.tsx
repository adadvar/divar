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

const ProfileMobOverlay = () => {
    const global = useSelector((state: RootState) => state.global);
    const selectedCat = global.selectedCat;
    const dispatch = useDispatch();

    return (
        <div className="lg:hidden flex flex-col absolute top-0 left-0 right-0 bottom-[66px]  bg-white m-auto rounded-md w-full h-[calc(100vh-66px)] z-50">
            <div className="text-gray-800 text-sm font-bold shadow-sm">
                <p className="px-3 py-4">دیوار من</p>
            </div>
            <p className="text-gray-800 text-sm px-3 py-4">
                برای استفاده از تمام امکانات دیوار وارد حساب خود شوید.
            </p>
            <div className="px-6 text-gray-600 text-sm">
                <button className="flex items-center hover:bg-gray-200 w-full p-2 rounded">
                    <LoginIcon />
                    <p className="ps-2">ورود به حساب کاربری</p>
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
                <button className=" hover:bg-gray-200 p-2 rounded-full">
                    <TwitterIcon />
                </button>
                <button className=" hover:bg-gray-200 p-2 rounded-full">
                    <InstaIcon />
                </button>
                <button className=" hover:bg-gray-200 p-2 rounded-full">
                    <LinkedinIcon />
                </button>
            </div>
        </div>
    );
};

export default ProfileMobOverlay;
