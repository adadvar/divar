"use client";
import {
    DIALOG_TYPE_CATEGORY_MEGA_MENU,
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
import { useGlobal } from "@/app/store/global-store";
import RegisterVerifyMobOverlay from "./login/RegisterVerifyMobOverlay";
import MegaMenu from "./navbar/category/MegaMenu";

const Overlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    return (
        <>
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
                        className={`fixed w-full h-[calc(100vh_-_66px)] inset-x-0 bottom-0 bg-black opacity-50  overflow-auto transition duration-300 ease-in-out z-50`}
                        onClick={() => setTypeDialog("")}
                    ></div>
                )}

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
            {typeDialog && typeDialog == DIALOG_TYPE_CATEGORY_MEGA_MENU && (
                <MegaMenu />
            )}
        </>
    );
};

export default Overlay;
