import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

const AdvertsPage = ({ searchParams }: { searchParams: any }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    // const { count, users } = await fetchUsers(q, page);
    const users: any[] = [
        {
            id: 1,
            username: "alireza dadvar",
            email: "test@gmail.com",
            createdAt: "2012.01.01",
            isAdmin: true,
            status: "active",
            isActive: true,
        },
    ];
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a user..." />
                <Link href="/admin/dashboard/adverts/add">
                    <button className="p-3 bg-[#5d57c9] text-text border-none rounded cursor-pointer">
                        Add New
                    </button>
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-3">Name</td>
                        <td className="p-3">Email</td>
                        <td className="p-3">Created At</td>
                        <td className="p-3">Role</td>
                        <td className="p-3">Status</td>
                        <td className="p-3">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    <MdPerson size={50} />

                                    {user.username}
                                </div>
                            </td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                                {user.createdAt?.toString().slice(4, 16)}
                            </td>
                            <td className="p-3">
                                {user.isAdmin ? "Admin" : "Client"}
                            </td>
                            <td className="p-3">
                                {user.isActive ? "active" : "passive"}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-3">
                                    <Link
                                        href={`/admin/dashboard/adverts/${user.id}`}
                                    >
                                        <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600">
                                            View
                                        </button>
                                    </Link>
                                    <form action={""}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={user.id}
                                        />
                                        <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-rose-600">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default AdvertsPage;
