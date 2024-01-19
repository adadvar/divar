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
    const {
        designerElements,
        addDesignerElement,
        removeDesignerElement,
        selectedDesignerElements,
        setSelectedDesignerElements,
    } = useTmp();
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

            const isDesignerBtnElement =
                active.data?.current?.isDesignerBtnElement;
            const isDroppingOverDesignerDropArea =
                over.data?.current?.isDesignerDropArea;
            const droppingSidebarBtnOverDesignerDropArea =
                isDesignerBtnElement && isDroppingOverDesignerDropArea;
            // First scenario
            if (droppingSidebarBtnOverDesignerDropArea) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                );
                addDesignerElement(designerElements.length, newElement);
                return;
            }

            const isDroppingOverDesignerElementTopHalf =
                over.data?.current?.isTopHalfDesignerElement;

            const isDroppingOverDesignerElementBottomHalf =
                over.data?.current?.isBottomHalfDesignerElement;

            const isDroppingOverDesignerElement =
                isDroppingOverDesignerElementTopHalf ||
                isDroppingOverDesignerElementBottomHalf;

            const droppingSidebarBtnOverDesignerElement =
                isDesignerBtnElement && isDroppingOverDesignerElement;

            // Second scenario
            if (droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(
                    idGenerator()
                );

                const overId = over.data?.current?.elementId;

                const overElementIndex = designerElements.findIndex(
                    (el) => el.id === overId
                );
                if (overElementIndex === -1) {
                    throw new Error("element not found");
                }

                let indexForNewElement = overElementIndex; // i assume i'm on top-half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1;
                }

                addDesignerElement(indexForNewElement, newElement);
                return;
            }

            // Third scenario
            const isDraggingDesignerElement =
                active.data?.current?.isDesignerElement;

            const draggingDesignerElementOverAnotherDesignerElement =
                isDroppingOverDesignerElement && isDraggingDesignerElement;

            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                const activeElementIndex = designerElements.findIndex(
                    (el) => el.id === activeId
                );

                const overElementIndex = designerElements.findIndex(
                    (el) => el.id === overId
                );

                if (activeElementIndex === -1 || overElementIndex === -1) {
                    throw new Error("element not found");
                }

                const activeElement = {
                    ...designerElements[activeElementIndex],
                };
                removeDesignerElement(activeId);

                let indexForNewElement = overElementIndex; // i assume i'm on top-half
                if (isDroppingOverDesignerElementBottomHalf) {
                    indexForNewElement = overElementIndex + 1;
                }

                addDesignerElement(indexForNewElement, activeElement);
            }
        },
    });
    return (
        <div className="flex w-full h-full">
            <div
                className="p-4 w-full"
                onClick={() => {
                    if (selectedDesignerElements)
                        setSelectedDesignerElements(null);
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={`bg-bg max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto ${
                        droppable.isOver && "ring-2 ring-inset ring-primary/20"
                    }`}
                >
                    {!droppable.isOver && designerElements.length == 0 && (
                        <p className="text-3xl flex flex-grow items-center font-bold">
                            Drop here
                        </p>
                    )}
                    {droppable.isOver && designerElements.length === 0 && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-r-md bg-gray-300/20"></div>
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
    const {
        removeDesignerElement,
        selectedDesignerElements,
        setSelectedDesignerElements,
    } = useTmp();

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
    const topHalf = useDroppable({
        id: el.id + "-top",
        data: {
            type: el.type,
            elementId: el.id,
            isTopHalfDesignerElement: true,
        },
    });
    const bottomHalf = useDroppable({
        id: el.id + "-bottom",
        data: {
            type: el.type,
            elementId: el.id,
            isBottomHalfDesignerElement: true,
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

    if (draggable.isDragging) return null;
    const DesignerElement = FormElements[el.type].desingerComponent;
    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-bgSoft ring-inset"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedDesignerElements(el);
            }}
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
                            onClick={(e) => {
                                e.stopPropagation();
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
            {topHalf.isOver && (
                <div className="absolute top-0 w-full rounded-md h-2 bg-text rounded-b-none"></div>
            )}
            <div
                className={`flex w-full h-[120px] items-center rounded-md bg-bg/40 px-4 py-2 pointer-events-none opacity-100 ${
                    mouseIsOver && "opacity-30"
                }`}
            >
                <DesignerElement elementInstance={el} />
            </div>
            {bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full rounded-md h-2 bg-text rounded-t-none"></div>
            )}
        </div>
    );
}

export default Designer;
