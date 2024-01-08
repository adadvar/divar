import { MdPerson } from "react-icons/md";

const SingleUserPage = ({ params }: { params: { id: number } }) => {
    const { id } = params;
    // const user = await fetchUser(id);
    const user: any = {
        id: 1,
        username: "alireza dadvar",
        email: "test@gmail.com",
        createdAt: "2012.01.01",
        isAdmin: true,
        status: "active",
        isActive: true,
        address: "my adresss",
    };
    return (
        <div className="flex gap-12 mt-5">
            <div className="w-1/3 bg-bgSoft p-5 rounded-lg font-bold text-textSoft h-max">
                <div className="flex items-center justify-center w-full h-72 relative rounded-lg overflow-hidden mb-5 mx-auto">
                    {/* <Image src={user.img || "/noavatar.png"} alt="" fill /> */}
                    <MdPerson size={270} />
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
                    <label className="text-xs">Username</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="username"
                        placeholder={user.username}
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
                    <label className="text-xs">Phone</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="phone"
                        placeholder={user.phone}
                    />
                    <label className="text-xs">Address</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="address"
                        placeholder={user.address}
                    />
                    <label className="text-xs">Is Admin?</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="isAdmin"
                        id="isAdmin"
                    >
                        <option value={true.toString()} selected={user.isAdmin}>
                            Yes
                        </option>
                        <option
                            value={false.toString()}
                            selected={!user.isAdmin}
                        >
                            No
                        </option>
                    </select>
                    <label className="text-xs">Is Active?</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="isActive"
                        id="isActive"
                    >
                        <option
                            value={true.toString()}
                            selected={user.isActive}
                        >
                            Yes
                        </option>
                        <option
                            value={false.toString()}
                            selected={!user.isActive}
                        >
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
