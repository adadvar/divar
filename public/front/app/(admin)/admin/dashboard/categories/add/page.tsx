import React from "react";

const AddAdvertPage = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <form action={""} className="flex flex-wrap justify-between">
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="text"
                    placeholder="title"
                    name="title"
                    required
                />
                <select
                    name="cat"
                    id="cat"
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                >
                    <option value="general">Choose a Category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="number"
                    placeholder="price"
                    name="price"
                    required
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="number"
                    placeholder="stock"
                    name="stock"
                    required
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="text"
                    placeholder="color"
                    name="color"
                />
                <input
                    className="p-7 w-[45%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    type="text"
                    placeholder="size"
                    name="size"
                />
                <textarea
                    className="p-7 w-full bg-bg text-text border-solid border-2 border-[#2e374a] rounded mb-7"
                    required
                    name="desc"
                    id="desc"
                    rows={8}
                    placeholder="Description"
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

export default AddAdvertPage;
