import { listUsers } from "@/app/lib/data";
import { MdSupervisedUserCircle } from "react-icons/md";
const card = async () => {
    const users = await listUsers({});
    const count = users.total;
    return (
        <div className="flex gap-5 cursor-pointer bg-bgSoft hover:bg-[#2e374a] w-full p-3 rounded-lg">
            <MdSupervisedUserCircle size={24} />
            <div className="flex flex-col gap-5">
                <span className="">Total Users</span>
                <span className="text-2xl font-medium">{count}</span>
                <span className="text-sm font-light">
                    <span className="text-lime-600">12%</span> more than
                    previous week
                </span>
                <span className=""></span>
            </div>
        </div>
    );
};

export default card;
