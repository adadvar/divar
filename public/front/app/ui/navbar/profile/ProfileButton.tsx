"use client";
import React, { useState } from "react";
import { BsPerson as PersonIcon } from "react-icons/bs";
import ProfileMenu from "./ProfileMenu";
import { useTmp } from "@/app/store/global-store";

const ProfileButton = ({ isLogged }: { isLogged: boolean }) => {
    const { ProfMenuOpen, setProfMenuOpen } = useTmp();

    return (
        <div className="relative">
            <button
                className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800"
                onClick={() => setProfMenuOpen(!ProfMenuOpen)}
            >
                <div className="text-xl">
                    <PersonIcon />
                </div>
                <span className="text-xs">دیوارمن</span>
            </button>
            {ProfMenuOpen && <ProfileMenu isLogged={isLogged} />}
        </div>
    );
};

export default ProfileButton;
