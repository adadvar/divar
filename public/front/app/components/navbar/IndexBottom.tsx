import RegisterAdvertButtonMob from "./RegisterAdvertButtonMob";
import ChatButtonMob from "./ChatButtonMob";
import CategoryButtonMob from "./category/ButtonMob";
import LogoBottom from "./LogoBottom";
import ProfileButtonMob from "./profile/ProfileButtonMob";

const IndexBottom = () => {
    return (
        <div className="lg:hidden shadow-[0_5px_11px_rgba(0,0,0,0.35)] w-full fixed bottom-0">
            <div className="lg:hidden navbar justify-between items-center 2xl:container 2xl:px-16 mx-auto px-5">
                <LogoBottom />
                <CategoryButtonMob />
                <RegisterAdvertButtonMob />
                <ChatButtonMob />
                <ProfileButtonMob />
            </div>
        </div>
    );
};

export default IndexBottom;
