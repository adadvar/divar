"use client";
import {
    DIALOG_TYPE_CATEGORY_MOB,
    DIALOG_TYPE_CITY,
    DIALOG_TYPE_CITY_MOB,
    DIALOG_TYPE_LOGIN_MOB,
    DIALOG_TYPE_PROFILE_MOB,
    DIALOG_TYPE_REGISTER_USER_MOB,
    DIALOG_TYPE_REGISTER_VERIFY_USER_MOB,
    DIALOG_TYPE_SEARCH_MOB,
} from "@/public/utils";
import CitySelectOverlay from "./navbar/city/SelectOverlay";
import SearchMobOverlay from "./navbar/search/SearchMobOverlay";
import CitySelectMobOverlay from "./navbar/city/SelectMobOverlay";
import CateogrySelectMobOverlay from "./navbar/category/SelectMobOverlay";
import ProfileMobOverlay from "./navbar/profile/ProfileMobOverlay";
import LoginMobOverlay from "./login/LoginMobOverlay";
import RegisterMobOverlay from "./login/RegisterMobOverlay";
import { useEffect } from "react";
import { useGlobal } from "@/app/store/global-store";
import RegisterVerifyMobOverlay from "./login/RegisterVerifyMobOverlay";

const Overlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    return (
        <>
            {typeDialog && typeDialog == DIALOG_TYPE_LOGIN_MOB && (
                <LoginMobOverlay />
            )}
            {typeDialog && typeDialog == DIALOG_TYPE_REGISTER_USER_MOB && (
                <RegisterMobOverlay />
            )}
            {typeDialog &&
                typeDialog == DIALOG_TYPE_REGISTER_VERIFY_USER_MOB && (
                    <RegisterVerifyMobOverlay />
                )}
            {typeDialog && typeDialog == DIALOG_TYPE_CITY && (
                <CitySelectOverlay />
            )}
            {typeDialog && typeDialog == DIALOG_TYPE_SEARCH_MOB && (
                <SearchMobOverlay />
            )}
            {typeDialog && typeDialog == DIALOG_TYPE_CITY_MOB && (
                <CitySelectMobOverlay />
            )}
            {typeDialog && typeDialog == DIALOG_TYPE_CATEGORY_MOB && (
                <CateogrySelectMobOverlay />
            )}
            {typeDialog && typeDialog == DIALOG_TYPE_PROFILE_MOB && (
                <ProfileMobOverlay />
            )}
            {typeDialog &&
                ![
                    DIALOG_TYPE_SEARCH_MOB,
                    DIALOG_TYPE_CITY_MOB,
                    DIALOG_TYPE_CATEGORY_MOB,
                    DIALOG_TYPE_PROFILE_MOB,
                    DIALOG_TYPE_LOGIN_MOB,
                    DIALOG_TYPE_REGISTER_USER_MOB,
                    DIALOG_TYPE_REGISTER_VERIFY_USER_MOB,
                ].includes(typeDialog) && (
                    <div
                        className={`w-full h-[calc(100vh_-_66px)] fixed bottom-0 bg-black ${
                            typeDialog ? "opacity-30" : "opacity-0"
                        } overflow-auto transition duration-300 ease-in-out`}
                        onClick={() => setTypeDialog("")}
                    ></div>
                )}
        </>
    );
};

export default Overlay;
