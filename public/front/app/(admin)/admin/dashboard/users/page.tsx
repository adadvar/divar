import { listUsers } from "@/app/lib/data";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import { user } from "@/public/interfaces";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";
const UsersPage = async ({ searchParams }: { searchParams: any }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    let cookie: any = cookies().get("token");
    const token = cookie && JSON.parse(cookie.value);
    const users: any = await listUsers({ token: token, q, page });
    const count = users.total;
    const per_page = users.per_page;
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a user..." />
                <Link href="/admin/dashboard/users/add">
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
                    {users.data.map((user: any) => (
                        <tr key={user.id}>
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={user.avatar || "/noavatar.png"}
                                        alt=""
                                        width={40}
                                        height={40}
                                        className="object-cover rounded-full"
                                    />

                                    {user.name}
                                </div>
                            </td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">
                                {user.created_at?.toString().slice(0, 10)}
                            </td>
                            <td className="p-3">{user.type}</td>
                            <td className="p-3">
                                {user.is_active ? "active" : "passive"}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-3">
                                    <Link
                                        href={`/admin/dashboard/users/${user.id}`}
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
            <Pagination per_page={per_page} count={count} />
        </div>
    );
};

export default UsersPage;
