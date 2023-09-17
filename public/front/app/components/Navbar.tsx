import React from "react";
import Logo from "./Logo";
import Divider from "./Divider";
import Location from "./Location";

const Navbar = () => {
    return (
        <div className="navbar shadow-md w-full px-5">
            <Logo />
            <Divider direction="vertical" />
            <Location text="تبریز"/>
        </div>
    );
};

export default Navbar;
