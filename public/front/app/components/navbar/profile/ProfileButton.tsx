"use client";
import React from "react";
import { BsPerson as PersonIcon } from "react-icons/bs";

const ProfileButton = () => {
    return (
        <button className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800">
            <div className="text-xl">
                <PersonIcon />
            </div>
            <span className="text-xs">دیوارمن</span>
        </button>
    );
};

export default ProfileButton;
