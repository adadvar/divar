"use client";

import {
    DragEndEvent,
    useDndMonitor,
    useDraggable,
    useDroppable,
} from "@dnd-kit/core";
import DesignerSidebar from "./designerSidebar";
import {
    ElementsType,
    FormElementInstance,
    FormElements,
} from "./formElements";
import { idGenerator } from "@/app/lib/utils";
import { useTmp } from "@/app/store/global-store";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";

const Designer = () => {
    const { designerElements, addDesignerElement } = useTmp();
    const droppable = useDroppable({
        id: "desinger-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesingerBtnElement =
                active.data?.current?.isDesingerBtnElement;
            if (isDesingerBtnElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                );
                addDesignerElement(newElement);
            }
        },
    });
    return (
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                    ref={droppable.setNodeRef}
                    className={`bg-bg max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${
                        droppable.isOver && "ring-2 ring-primary/20"
                    }`}
                >
                    {!droppable.isOver && designerElements.length == 0 && (
                        <p className="text-3xl flex flex-grow items-center font-bold">
                            Drop here
                        </p>
                    )}
                    {droppable.isOver && designerElements.length === 0 && (
                        <div className="p-4 w-full">
                            <div className="h-[50px] rounded-r-md bg-gray-300/20"></div>
                        </div>
                    )}
                    {designerElements.length > 0 && (
                        <div className="flex flex-col w-full gap-2 p-4">
                            {designerElements.map((el) => (
                                <DesignerElementWrapper key={el.id} el={el} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
};

function DesignerElementWrapper({ el }: { el: FormElementInstance }) {
    const { removeDesignerElement } = useTmp();

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const topHalf = useDroppable({
        id: el.id + "-top",
        data: {
            type: el.type,
            elmenetId: el.id,
            idTopHalfDesignerElement: true,
        },
    });
    const bottomHalf = useDroppable({
        id: el.id + "-bottom",
        data: {
            type: el.type,
            elmenetId: el.id,
            idBottomHalfDesignerElement: true,
        },
    });

    const draggable = useDraggable({
        id: el.id + "-drag-handler",
        data: {
            type: el.type,
            elementId: el.id,
            isDesignerElement: true,
        },
    });

    const DesignerElement = FormElements[el.type].desingerComponent;
    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-bgSoft ring-inset"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <div
                ref={topHalf.setNodeRef}
                className="absolute w-full h-1/2 rounded-t-md"
            />
            <div
                ref={bottomHalf.setNodeRef}
                className="absolute w-full h-1/2 bottom-0 rounded-b-md"
            />
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <button
                            className="flex justify-center items-center h-full border rounded-md rounded-s-none bg-red-500 p-2"
                            onClick={() => {
                                removeDesignerElement(el.id);
                            }}
                        >
                            <BiSolidTrash className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}
            <div
                className={`flex w-full h-[120px] items-center rounded-md bg-bg/40 px-4 py-2 pointer-events-none opacity-100 ${
                    mouseIsOver && "opacity-30"
                }`}
            >
                <DesignerElement elementInstance={el} />
            </div>
        </div>
    );
}

export default Designer;
