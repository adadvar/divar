import React from "react";

const Pagination = () => {
    return (
        <div className="flex justify-between p-3">
            <button className="py-1 px-2 btn btn-ghost btn-disabled">
                Previous
            </button>
            <button className="py-1 px-2 btn btn-ghost">Next</button>
        </div>
    );
};

export default Pagination;
