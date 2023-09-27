import Logo from "./Logo";
import CategoryButtonMob from "./CategoryButtonMob";
import RegisterAdvertButtonMob from "./RegisterAdvertButtonMob";
import ChatButtonMob from "./ChatButtonMob";
import ProfileButtonMob from "./ProfileButtonMob";

const BottomIndex = () => {
    return (
        <div className="lg:hidden shadow-[0_5px_11px_rgba(0,0,0,0.35)] w-full fixed bottom-0">
            <div className="lg:hidden navbar justify-between items-center 2xl:container 2xl:px-16 mx-auto px-5">
                <button className="flex flex-col px-2">
                    <Logo size={25} />
                    <p className="text-xs text-red-900">آگهی ها</p>
                </button>
                <CategoryButtonMob />
                <RegisterAdvertButtonMob />
                <ChatButtonMob />
                <ProfileButtonMob />
            </div>
        </div>
    );
};

export default BottomIndex;
