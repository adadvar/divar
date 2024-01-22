import { createForm } from "@/app/lib/actions";
import { useTmp } from "@/app/store/global-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdPreview } from "react-icons/md";

const IsPublishedBtn = ({ slug }: { slug: string }) => {
    const { designerElements } = useTmp();
    const router = useRouter();

    return (
        <>
            <button
                className="flex items-center justify-center btn btn-primary gap-2"
                onClick={() => {
                    // @ts-ignore
                    document.getElementById("publish_modal").showModal();
                }}
            >
                <MdPreview className="h-6 w-6" />
                publish
            </button>
            <dialog id="publish_modal" className="modal">
                <div className="modal-box">
                    <div className="px-4 py-2">
                        <p className="text-lg font-bold ">
                            Are you absolutely sure?
                        </p>
                        <p className="text-sm">
                            This action can not be undo. After publishing you
                            will not be able to edit this form.
                        </p>
                    </div>

                    <div className="modal-action">
                        <form
                            action={async () => {
                                const result = await createForm({
                                    published: true,
                                    slug,
                                });
                                if (result?.message) {
                                    toast.error(result.message);
                                } else {
                                    router.refresh();
                                    toast.success("با موفقیت ذخیره شد");
                                }
                            }}
                        >
                            <button className="btn btn-primary">process</button>
                        </form>
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

export default IsPublishedBtn;
