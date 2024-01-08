import { MdPerson } from "react-icons/md";

const SigleAdvertPage = ({ params }: { params: { id: number } }) => {
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
                    <label className="text-xs">Title</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="title"
                        placeholder={user.username}
                    />
                    <label className="text-xs">Price</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="number"
                        name="price"
                        placeholder={user.email}
                    />
                    <label className="text-xs">Stock</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="number"
                        name="stock"
                    />
                    <label className="text-xs">Color</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="color"
                        placeholder={user.phone}
                    />
                    <label className="text-xs">Size</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="address"
                        placeholder={user.address}
                    />
                    <label className="text-xs">Cat</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="cat"
                        id="cat"
                    >
                        <option value="kitchen">Kitchen</option>
                        <option value="computers">Computers</option>
                    </select>
                    <label className="text-xs">Description</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="des"
                        id="des"
                        placeholder={user.address}
                    />
                    <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 mt-5">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SigleAdvertPage;
