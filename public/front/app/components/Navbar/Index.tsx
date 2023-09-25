import React from "react";
import Logo from "./Logo";
import Divider from "./Divider";
import LocationButton from "./CityButton";
import CategoryButton from "./CategoryButton";
import ProfileButton from "./ProfileButton";
import ChatButton from "./ChatButton";
import SupportButton from "./SupportButton";
import RegisterAdvertButton from "./RegisterAdvertButton";
import SearchBoxNavbar from "./SearchBoxNavbar";

const Navbar = () => {
    return (
        <div className="shadow-sm w-full">
            <div className="navbar justify-between 2xl:container 2xl:px-16 mx-auto px-5">
                <div className="flex text-center items-center gap-3">
                    <Logo />
                    <Divider direction="vertical" style="" />
                    <LocationButton text="تبریز" />
                    <CategoryButton />
                    <SearchBoxNavbar />
                </div>
                <div className="flex text-center items-center gap-3">
                    <ProfileButton />
                    <ChatButton />
                    <SupportButton />
                    <RegisterAdvertButton />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
