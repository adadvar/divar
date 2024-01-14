import { addUser } from "@/app/lib/actions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const AddUserPage = () => {
    const handleUpdate = async (e: FormData) => {
        "use server";
        let cookie: any = cookies().get("token");
        const token = cookie && JSON.parse(cookie.value);
        await addUser({ formData: e });
        revalidatePath("/admin/dashboard/users");
        redirect("/admin/dashboard/users");
    };
    return (
        <div className="flex gap-12 mt-5">
            <div className="w-1/3 bg-bgSoft p-5 rounded-lg font-bold text-textSoft h-max">
                <div className="w-full h-72 relative rounded-lg overflow-hidden mb-5 mx-auto">
                    <Image src={"/noavatar.png"} alt="" fill />
                    {/* <MdPerson size={270} /> */}
                </div>
            </div>
            <div className="w-2/3 bg-bgSoft p-5 rounded-lg">
                <form action={handleUpdate} className="flex flex-col">
                    <label className="text-xs">name</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="name"
                        placeholder={""}
                    />
                    <label className="text-xs">Email</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="email"
                        name="email"
                        placeholder={""}
                    />
                    {/* <label className="text-xs">Password</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="password"
                        name="password"
                    /> */}
                    <label className="text-xs">mobile</label>
                    <input
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        type="text"
                        name="mobile"
                        placeholder={""}
                    />
                    {/* <label className="text-xs">Address</label>
                    <textarea
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="address"
                        placeholder={user.address}
                    /> */}
                    <label className="text-xs">type</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="type"
                        id="type"
                        defaultValue={"user"}
                    >
                        <option value={"admin"}>admin</option>
                        <option value={"user"}>user</option>
                    </select>
                    <label className="text-xs">Is Active?</label>
                    <select
                        className="p-5 my-3 bg-bg text-text border-solid border-2 border-[#2e374a] rounded"
                        name="is_active"
                        id="is_active"
                        defaultValue={1}
                    >
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </select>
                    <button className="w-full p-5 text-text border-none rounded-md bg-teal-500 mt-5">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUserPage;
