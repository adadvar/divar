"use client";

import {
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import Designer from "./designer";
import DragOverlayWrapper from "./dragOverlayWrapper";
import { useId } from "react";
import PreviewDialogBtn from "./previewDialogBtn";
import { useTmp } from "@/app/store/global-store";
import { MdSave } from "react-icons/md";
import { createForm } from "@/app/lib/actions";

const FormBuilder = ({ slug }: { slug: string }) => {
    const id = useId();
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, // 10px
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    });
    const sensors = useSensors(mouseSensor, touchSensor);
    const { designerElements } = useTmp();

    return (
        <DndContext id={id} sensors={sensors}>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <PreviewDialogBtn />
                    <form
                        action={async () => {
                            await createForm({
                                content: designerElements,
                                description: "this is form data",
                                slug,
                            });
                        }}
                    >
                        <button className="flex items-center justify-center btn btn-accent gap-2">
                            <MdSave />
                            Save
                        </button>
                    </form>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
};

export default FormBuilder;
