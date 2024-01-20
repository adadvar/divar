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
import { useEffect, useId } from "react";
import PreviewDialogBtn from "./previewDialogBtn";
import { useTmp } from "@/app/store/global-store";
import SaveForm from "@/app/ui/form/saveForm";

const FormBuilder = ({ slug, form }: { slug: string; form: object }) => {
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
    const { setDesignerElements } = useTmp();
    useEffect(() => {
        //@ts-ignore
        setDesignerElements(form);
    }, [form, setDesignerElements]);

    return (
        <DndContext id={id} sensors={sensors}>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <PreviewDialogBtn />
                    <SaveForm slug={slug} />
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
