"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    title: string;
    icon: string | null;
    path: string;
};

const menuLink = ({ item }: { item: Props }) => {
    const pathname = usePathname();
    return (
        <Link
            href={item.path}
            className={`flex p-5 items-center gap-3 my-1 rounded-xl ${
                pathname === item.path && "bg-[#2e374a]"
            } hover:bg-[#2e374a]`}
        >
            {item.icon}
            {item.title}
        </Link>
    );
};

export default menuLink;
