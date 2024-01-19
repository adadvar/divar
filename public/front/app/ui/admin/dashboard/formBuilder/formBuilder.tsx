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

const FormBuilder = () => {
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
    return (
        <DndContext id={id} sensors={sensors}>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <input
                        className="p-7 w-[40%] bg-bg text-text border-solid border-2 border-[#2e374a] rounded "
                        type="text"
                        placeholder="title"
                        name="title"
                        required
                    />
                    <div className="flex items-center gap-2">
                        <button
                            className="p-7 text-text border-none rounded-md bg-teal-500"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                    <PreviewDialogBtn />
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
