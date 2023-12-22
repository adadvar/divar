import RegisterAdvertButtonMob from "./RegisterAdvertButtonMob";
import ChatButtonMob from "./chat/ChatButtonMob";
import CategoryButtonMob from "./category/ButtonMob";
import LogoBottom from "./LogoBottom";
import ProfileButtonMob from "./profile/ProfileButtonMob";
import { useGlobal } from "@/app/src/global-store";
import { DIALOG_TYPE_LOGIN_MOB } from "@/public/utils";
import { useEffect } from "react";

const IndexBottom = () => {
    const typeDialog = useGlobal.getState().typeDialog;
    const isHide = typeDialog == DIALOG_TYPE_LOGIN_MOB;
    console.log("typedialog", typeDialog);

    if (isHide) return null;

    return (
        <div className="lg:hidden flex justify-around items-center shadow-[0_5px_11px_rgba(0,0,0,0.35)] h-16 fixed inset-x-0 bottom-0 bg-white z-50">
            <LogoBottom />
            <CategoryButtonMob />
            <RegisterAdvertButtonMob />
            <ChatButtonMob />
            <ProfileButtonMob />
        </div>
    );
};

export default IndexBottom;
