import React from "react";

const AddAdvertPage = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <form action={""} className="flex flex-wrap justify-between">
                <input type="text" placeholder="title" name="title" required />
                <select name="cat" id="cat">
                    <option value="general">Choose a Category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input
                    className="p-8 w-2/5"
                    type="number"
                    placeholder="price"
                    name="price"
                    required
                />
                <input
                    className="p-8 w-2/5"
                    type="number"
                    placeholder="stock"
                    name="stock"
                    required
                />
                <input
                    className="p-8 w-2/5"
                    type="text"
                    placeholder="color"
                    name="color"
                />
                <input
                    className="p-8 w-2/5"
                    type="text"
                    placeholder="size"
                    name="size"
                />
                <textarea
                    className="p-8"
                    required
                    name="desc"
                    id="desc"
                    rows={16}
                    placeholder="Description"
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddAdvertPage;
