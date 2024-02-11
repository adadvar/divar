"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
    MdDehaze,
} from "react-icons/md";
import Sidebar from "@/app/ui/admin/dashboard/sidebar-mob";

const navbar = () => {
    const pathname = usePathname();
    const [sideOpen, setSideOpen] = useState(false);

    if (sideOpen) return <Sidebar setSideClose={() => setSideOpen(false)} />;

    return (
        <div className="flex items-center justify-between p-5 rounded-xl bg-bgSoft">
            <button
                className="md:hidden cursor-pointer"
                onClick={() => setSideOpen(!sideOpen)}
            >
                <MdDehaze size={20} />
            </button>
            <div className="text-textSoft font-bold capitalize">
                {pathname.split("/").pop()}
            </div>
            <div className="flex items-center gap-3">
                <div className="md:flex hidden items-center gap-3 bg-[#2e374a] p-3 rounded-xl">
                    <MdSearch size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-text"
                    />
                </div>
                <div className="flex gap-5">
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                    <MdPublic size={20} />
                </div>
            </div>
        </div>
    );
};

export default navbar;
