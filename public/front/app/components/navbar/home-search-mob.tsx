"use client";

import { usePathname } from "next/navigation";
import SearchBoxMob from "./search/InputBoxMob";

const HomeSearchMob = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    return (
        <>
            {isHomePage && (
                <div className="lg:hidden flex items-center w-full ">
                    <SearchBoxMob />
                </div>
            )}
        </>
    );
};

export default HomeSearchMob;
