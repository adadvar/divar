import { fetchUser } from "@/app/lib/data";
import { cookies } from "next/headers";
import Image from "next/image";
import { MdPerson } from "react-icons/md";

const SingleUserPage = async ({ params }: { params: { id: number } }) => {
    const { id } = params;
    let cookie: any = cookies().get("token");
    const token = cookie && JSON.parse(cookie.value);
    const user = await fetchUser({ token: token.access_token, id });

    return (
        <div className="flex gap-12 mt-5">
            <div className="w-1/3 bg-bgSoft p-5 rounded-lg font-bold text-textSoft h-max">
                <div className="flex items-center justify-center w-full h-72 relative rounded-lg overflow-hidden mb-5 mx-auto">
                    <Image src={user.avatar || "/noavatar.png"} alt="" fill />
                    {/* <MdPerson size={270} /> */}
                </div>
                {user.username}
            </div>
            <div className="w-2/3 bg-bgSoft p-5 rounded-lg">
                <form action={"updateUser"} className="flex flex-col">
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="hidden"
                        name="id"
                        value={user.id}
                    />
                    <label className="text-xs">name</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="name"
                        placeholder={user.name}
                    />
                    <label className="text-xs">Email</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="email"
                        name="email"
                        placeholder={user.email}
                    />
                    <label className="text-xs">Password</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="password"
                        name="password"
                    />
                    <label className="text-xs">mobile</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="mobile"
                        placeholder={user.mobile}
                    />
                    <label className="text-xs">Address</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="address"
                        placeholder={user.address}
                    />
                    <label className="text-xs">type</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="isAdmin"
                        id="isAdmin"
                    >
                        <option value={"admin"} selected={user.type == "admin"}>
                            admin
                        </option>
                        <option value={"user"} selected={!user.isAdmin}>
                            user
                        </option>
                    </select>
                    <label className="text-xs">Is Active?</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="isActive"
                        id="isActive"
                    >
                        <option
                            value={Date()}
                            selected={user.verified_at != null}
                        >
                            Yes
                        </option>
                        <option value={""} selected={user.verified_at == null}>
                            No
                        </option>
                    </select>
                    <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 mt-5">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SingleUserPage;
