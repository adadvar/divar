import React from "react";
import Logo from "./Logo";
import Divider from "../Divider";
import CityButton from "./city/CityButton";
import CategoryButton from "./CategoryButton";
import ProfileButton from "./ProfileButton";
import ChatButton from "./ChatButton";
import SupportButton from "./SupportButton";
import RegisterAdvertButton from "./RegisterAdvertButton";
import SearchBox from "./advert/AdvertSearchBox";
import SearchBoxMob from "./advert/AdvertSearchBoxMob";

const Index = () => {
    return (
        <div className="shadow-sm w-full fixed">
            <div className="navbar justify-between 2xl:container 2xl:px-16 mx-auto px-5">
                <div className="hidden lg:flex items-center space-x-3">
                    <Logo size={50} />
                    <Divider direction="vertical" style="" />
                    <CityButton text="تبریز" />
                    <CategoryButton />
                    <SearchBox />
                </div>
                <div className="hidden lg:flex items-center space-x-3">
                    <ProfileButton />
                    <ChatButton />
                    <SupportButton />
                    <RegisterAdvertButton />
                </div>
                <div className="lg:hidden w-full">
                    <SearchBoxMob />
                </div>
            </div>
        </div>
    );
};

export default Index;
