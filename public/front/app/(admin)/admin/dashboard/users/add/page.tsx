import { addUser } from "@/app/lib/actions";

const AddUserPage = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <form action={addUser} className="flex flex-wrap justify-between">
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="text"
                    placeholder="username"
                    name="username"
                    required
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="email"
                    placeholder="email"
                    name="email"
                    required
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="password"
                    placeholder="password"
                    name="password"
                    required
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="phone"
                    placeholder="phone"
                    name="phone"
                    required
                />
                <select
                    name="isAdmin"
                    id="isAdmin"
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                >
                    <option value={false.toString()}>Is Admin?</option>
                    <option value={true.toString()}>Yes</option>
                    <option value={false.toString()}>No</option>
                </select>
                <select
                    name="isActive"
                    id="isActive"
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                >
                    <option value={true.toString()}>Is Active?</option>
                    <option value={true.toString()}>Yes</option>
                    <option value={false.toString()}>No</option>
                </select>

                <textarea
                    className="p-7 w-full bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    required
                    name="address"
                    id="address"
                    rows={8}
                    placeholder="address"
                ></textarea>
                <button
                    className="w-full p-7 text-text border-none rounded-md bg-teal-500"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;
