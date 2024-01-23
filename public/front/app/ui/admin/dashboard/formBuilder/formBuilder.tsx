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
import { useEffect, useId, useState } from "react";
import PreviewDialogBtn from "./previewDialogBtn";
import { useTmp } from "@/app/store/global-store";
import SaveForm from "@/app/ui/form/saveForm";
import { ImSpinner2 } from "react-icons/im";
import IsPublishedBtn from "./isPublishedBtn";

const FormBuilder = ({ slug, form }: { slug: string; form: any }) => {
    const { setDesignerElements, setSelectedDesignerElements } = useTmp();
    const id = useId();

    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        if (isReady) return;
        //@ts-ignore
        setDesignerElements(form.content ? form.content : []);
        setIsReady(true);
        setSelectedDesignerElements(null);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout);
    }, [form, setDesignerElements, isReady]);

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

    if (!isReady)
        return (
            <div className="flex fixed top-60 w-full h-full">
                <ImSpinner2 className="animate-spin h-12 w-12" />
            </div>
        );

    return (
        <DndContext id={id} sensors={sensors}>
            <main className="flex flex-col w-full h-full">
                <nav className="flex justify-end border-b-2 p-4 gap-3 items-center">
                    <PreviewDialogBtn />
                    {!form.published && (
                        <>
                            <IsPublishedBtn slug={slug} />
                            <SaveForm slug={slug} />
                        </>
                    )}
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
