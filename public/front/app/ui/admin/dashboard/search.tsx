import React from "react";
import { MdSearch } from "react-icons/md";

const Search = ({ placeholder }: { placeholder: string }) => {
    return (
        <div className="flex items-center gap-3 bg-[#2e374a] p-3 rounded-xl w-max">
            <MdSearch size={20} />
            <input
                type="text"
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-text"
            />
        </div>
    );
};

export default Search;
