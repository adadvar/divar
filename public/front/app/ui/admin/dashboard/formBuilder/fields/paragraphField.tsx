import { useEffect, useRef } from "react";
import { useTmp } from "@/app/store/global-store";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";
import { BsTextParagraph } from "react-icons/bs";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
    text: "Text here",
};

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: "Paragraph Field",
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
            form.text.value = element.extraAttributes.text;
        }
    }, [element, formRef]);

    function applyChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const text = formData.get("text") as string;

        updateDesingerElement(element.id, {
            ...element,
            extraAttributes: {
                text,
            },
        });
    }

    return (
        <form
            ref={formRef}
            onBlur={applyChange}
            onSubmit={(e) => e.preventDefault()}
        >
            <label htmlFor="text">Text</label>
            <textarea
                name="text"
                rows={5}
                defaultValue={element.extraAttributes.text}
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
    const { text } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Paragraph field</label>
            <p>{text}</p>
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

    const { text } = element.extraAttributes;
    return <p>{text}</p>;
}
