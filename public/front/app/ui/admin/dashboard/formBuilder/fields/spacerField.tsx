import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";

const type: ElementsType = "SpacerField";

const extraAttributes = {
    height: 20, //px
};

export const SpacerFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: "Spacer Field",
    },
    desingerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const { updateDesingerElement } = useTmp();
    const element = elementInstance as CustomInstance;
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const form = formRef.current;
        if (form) {
            form.reset();
            // Set form fields' values to match the current element's extraAttributes
            form.height.value = element.extraAttributes.height;
        }
    }, [element, formRef]);

    function applyChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const height = formData.get("height") as string;

        updateDesingerElement(element.id, {
            ...element,
            extraAttributes: {
                height,
            },
        });
    }

    return (
        <form
            ref={formRef}
            onBlur={applyChange}
            onSubmit={(e) => e.preventDefault()}
        >
            <label htmlFor="height">
                Height (px): {element.extraAttributes.height}
            </label>
            <input
                type="range"
                name="height"
                min={5}
                max="200"
                className="range range-xs"
                defaultValue={element.extraAttributes.height}
                onChange={(e) => {
                    const newHeight = e.target.value;
                    const label = formRef.current?.querySelector("label");
                    if (label) {
                        label.textContent = `Height (px): ${newHeight}`;
                    }
                }}
            />
        </form>
    );
}

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { height } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Spacer field: {height}</label>
            <LuSeparatorHorizontal className="h-8 w-8" />
        </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {
    const element = elementInstance as CustomInstance;

    const { height } = element.extraAttributes;
    return <div style={{ height: height + "px", width: "100%" }}></div>;
}
