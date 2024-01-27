import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import { LuHeading1 } from "react-icons/lu";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";

const type: ElementsType = "TitleField";

const extraAttributes = {
    title: "Title field",
};

export const TitleFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: "Title Field",
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
            form.title = element.extraAttributes.title;
        }
    }, [element, formRef]);

    function applyChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;

        updateDesingerElement(element.id, {
            ...element,
            extraAttributes: {
                title,
            },
        });
    }

    return (
        <form
            ref={formRef}
            onBlur={applyChange}
            onSubmit={(e) => e.preventDefault()}
        >
            <label htmlFor="title">Title</label>
            <input
                type="text"
                name="title"
                defaultValue={element.extraAttributes.title}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
                className="bg-bg p-1 mb-3 mt-1 rounded-md outline-none"
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
    const { title } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Title field</label>
            <p className="text-xl">{title}</p>
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

    const { title } = element.extraAttributes;
    return <p className="text-xl">{title}</p>;
}
