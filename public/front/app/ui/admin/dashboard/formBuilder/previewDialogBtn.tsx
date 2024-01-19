import { useTmp } from "@/app/store/global-store";
import React from "react";
import { MdPreview } from "react-icons/md";
import { FormElements } from "./formElements";

const PreviewDialogBtn = () => {
    const { designerElements } = useTmp();
    return (
        <>
            <button
                className="flex items-center justify-center btn btn-accent gap-2"
                onClick={() => {
                    // @ts-ignore
                    document.getElementById("preview_modal").showModal();
                }}
            >
                <MdPreview className="h-6 w-6" />
                Preview
            </button>
            <dialog id="preview_modal" className="modal">
                <div className="modal-box">
                    <div className="px-4 py-2 border-b">
                        <p className="text-lg font-bold ">Form preview</p>
                        <p className="text-sm">
                            This is how your form will look like to your users.
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4   overflow-y-auto">
                        <div className="flex flex-col gap-4 w-full rounded-2xl p-8 overflow-y-auto">
                            {designerElements.map((element) => {
                                const FormComponent =
                                    FormElements[element.type].formComponent;
                                return (
                                    <FormComponent
                                        key={element.id}
                                        elementInstance={element}
                                    />
                                );
                            })}
                        </div>
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

export default PreviewDialogBtn;
