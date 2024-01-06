import React from "react";
import Logo from "./Logo";
import Divider from "../Divider";
import CityButton from "./city/Button";
import CategoryButton from "./category/Button";
import ProfileButton from "./profile/ProfileButton";
import ChatButton from "./chat/ChatButton";
import SupportButton from "./SupportButton";
import RegisterAdvertButton from "./RegisterAdvertButton";
import SearchBox from "./search/InputBox";
import HomeSearchMob from "./home-search-mob";

const Index = () => {
    return (
        <div className="shadow-sm fixed flex items-center h-16 inset-x-0 top-0 bg-white z-40">
            <div className="flex justify-between w-full 2xl:container 2xl:px-16 px-5 mx-auto">
                <div className="hidden lg:flex items-center space-x-3">
                    <Logo size={50} />
                    <Divider direction="vertical" style="" />
                    <CityButton />
                    <CategoryButton />
                    <div className="llg:w-[25rem] lg:w-[12rem]">
                        <SearchBox />
                    </div>
                </div>

                <div className="hidden lg:flex items-center space-x-3">
                    <ProfileButton />
                    <ChatButton />
                    <SupportButton />
                    <RegisterAdvertButton />
                </div>
                <HomeSearchMob />
            </div>
        </div>
    );
};

export default Index;
