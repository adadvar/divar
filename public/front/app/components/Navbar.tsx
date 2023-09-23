import React from "react";
import Logo from "./Logo";
import Divider from "./Divider";
import Location from "./LocationButton";
import Category from "./CategoryButton";
import SearchInput from "./SearchInput";
import Profile from "./Profile";
import Chat from "./Chat";

const Navbar = () => {
    return (
        <div className="navbar shadow-sm justify-between w-full px-5">
            <div className="flex text-center items-center">
                <Logo />
                <Divider direction="vertical" style=""/>
                <Location text="تبریز" />
                <Category text="دسته ها" />
                <SearchInput />
            </div>
            <div className="flex text-center items-center">
                <Profile />
                <Chat/>
            </div>
            
        </div>
    );
};

export default Navbar;
