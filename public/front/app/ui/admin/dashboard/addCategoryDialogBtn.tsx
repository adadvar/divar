"use client";

import React from "react";

const AddCategoryDialogBtn = () => {
    return (
        <>
            <button
                className="p-3 bg-[#5d57c9] text-text border-none rounded cursor-pointer"
                onClick={() => {
                    // @ts-ignore
                    document.getElementById("add_modal").showModal();
                }}
            >
                Add New
            </button>
            <dialog id="add_modal" className="modal">
                <div className="modal-box">
                    <div className="px-4 py-2 border-b">
                        <p className="text-lg font-bold ">Add Category</p>
                        <p className="text-sm">create a new category</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4   overflow-y-auto">
                        <div className="flex flex-col gap-4 w-full rounded-2xl p-8 overflow-y-auto"></div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute end-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default AddCategoryDialogBtn;
