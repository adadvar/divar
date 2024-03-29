import {
    MdPerson,
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import RegularList from "../../RegularList";
import menuLink from "./menuLink";
import { cookies } from "next/headers";
import { logout } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { me } from "@/app/lib/data";

const menuItems = [
    {
        title: "pages",
        list: [
            {
                title: "Dashboard",
                path: "/admin/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/admin/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Adverts",
                path: "/admin/dashboard/adverts",
                icon: <MdShoppingBag />,
            },
            {
                title: "Categories",
                path: "/admin/dashboard/categories",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/admin/dashboard/",
                icon: <MdWork />,
            },
            {
                title: "Reports",
                path: "/admin/dashboard/",
                icon: <MdAnalytics />,
            },
            {
                title: "Teams",
                path: "/admin/dashboard/",
                icon: <MdPeople />,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/admin/dashboard/",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Help",
                path: "/admin/dashboard/",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const sidebar = async () => {
    const data = await me();

    return (
        <div className="sticky top-10">
            <div className="flex items-center gap-5 mt-5">
                <MdPerson size={50} />
                <div className="flex flex-col">
                    <span className="font-medium">{data.name}</span>
                    <span className="text-xs text-textSoft">{data.type}</span>
                </div>
            </div>
            {menuItems.map((cat) => (
                <div className="" key={cat.title}>
                    <span className="text-textSoft font-bold text-xs my-3">
                        {cat.title}
                    </span>
                    <RegularList
                        items={cat.list}
                        ItemComponent={menuLink}
                        resourceName="item"
                    />
                </div>
            ))}
            <form
                action={async () => {
                    "use server";
                    await logout();
                    // revalidatePath("/admin/dashboard");
                    redirect("/admin/login");
                }}
            >
                <button className="flex p-5 items-center gap-3 my-1 rounded-xl bg-none border-none w-full text-white hover:bg-[#2e374a]">
                    <MdLogout />
                    Logout
                </button>
            </form>
        </div>
    );
};

export default sidebar;
