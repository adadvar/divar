"use client";
import { createForm } from "@/app/lib/actions";
import { useTmp } from "@/app/store/global-store";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";

const SaveForm = ({ slug }: { slug: string }) => {
    const { designerElements } = useTmp();

    return (
        <form
            action={async () => {
                const result = await createForm({
                    content: designerElements,
                    description: "this is form data",
                    slug,
                });
                if (result?.message) {
                    toast.error(result.message);
                } else {
                    toast.success("با موفقیت ذخیره شد");
                }
            }}
        >
            <button
                className="flex items-center justify-center btn btn-primary gap-2"
                // disabled={state}
            >
                <MdSave className="h-4 w-4" />
                Save
                {/* {loading && <FaSpinner className="animate-spin" />} */}
            </button>
        </form>
    );
};

export default SaveForm;
