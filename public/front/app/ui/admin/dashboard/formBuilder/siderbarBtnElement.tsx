import { FormElement } from "./formElements";
import { useDraggable } from "@dnd-kit/core";

const SiderbarBtnElement = ({ formElement }: { formElement: FormElement }) => {
    const { label, icon: Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: `designer-btn-${formElement.type}`,
        data: {
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    });

    return (
        <button
            ref={draggable.setNodeRef}
            className={`flex flex-col justify-center items-center ring-1 ring-gray-800 gap-2 h-[90px] w-[90px] cursor-grab m-0 ${
                draggable.isDragging && "ring-2 ring-primary/20"
            }`}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </button>
    );
};

export const SiderbarBtnElementDragOverlay = ({
    formElement,
}: {
    formElement: FormElement;
}) => {
    const { label, icon: Icon } = formElement.designerBtnElement;

    return (
        <button className="flex flex-col justify-center items-center bg-bgSoft gap-2 h-[90px] w-[90px] cursor-grab">
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </button>
    );
};

export default SiderbarBtnElement;
