"use client";
import { usePathname } from "next/navigation";
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
} from "react-icons/md";
const navbar = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center justify-between p-5 rounded-xl bg-bgSoft">
            <div className="text-textSoft font-bold capitalize">
                {pathname.split("/").pop()}
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-[#2e374a] p-3 rounded-xl">
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
