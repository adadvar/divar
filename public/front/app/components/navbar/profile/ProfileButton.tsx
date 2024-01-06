"use client";
import React, { useState } from "react";
import { BsPerson as PersonIcon } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";

const ProfileButton = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <div className="relative">
            <button
                className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
                onClick={toggleProfileMenu}
            >
                <div className="text-xl">
                    <PersonIcon />
                </div>
                <span className="text-xs">دیوارمن</span>
            </button>
            {isProfileMenuOpen && <ProfileMenu />}
        </div>
    );
};

export default ProfileButton;
