import RegisterAdvertButtonMob from "./RegisterAdvertButtonMob";
import ChatButtonMob from "./chat/ChatButtonMob";
import CategoryButtonMob from "./category/ButtonMob";
import LogoBottom from "./LogoBottom";
import ProfileButtonMob from "./profile/ProfileButtonMob";

const IndexBottom = () => {
    return (
        <div className="lg:hidden flex justify-between items-center 2xl:container 2xl:px-16 mx-auto px-5 shadow-[0_5px_11px_rgba(0,0,0,0.35)] h-16 fixed left-0 right-0 bottom-0 bg-white">
            <LogoBottom />
            <CategoryButtonMob />
            <RegisterAdvertButtonMob />
            <ChatButtonMob />
            <ProfileButtonMob />
        </div>
    );
};

export default IndexBottom;
