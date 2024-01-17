import { useEffect, useRef } from "react";
import { useTmp } from "@/app/store/global-store";
import { MdTextFields } from "react-icons/md";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
} from "../formElements";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text field",
    helperText: "Helper text",
    required: false,
    placeholder: "Value here ...",
};

export const TextFielsFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: "Text Field",
    },
    desingerComponent: DesignerComponent,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: PropertiesComponent,
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
            form.label.value = element.extraAttributes.label;
            form.placeholder.value = element.extraAttributes.placeholder;
            form.helperText.value = element.extraAttributes.helperText;
            form.required.checked = element.extraAttributes.required;
        }
    }, [element, formRef]);

    function applyChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const label = formData.get("label") as string;
        const placeholder = formData.get("placeholder") as string;
        const helperText = formData.get("helperText") as string;
        const required = formData.get("required") === "on";

        updateDesingerElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                placeholder,
                helperText,
                required,
            },
        });
    }

    return (
        <form
            ref={formRef}
            onBlur={applyChange}
            onSubmit={(e) => e.preventDefault()}
        >
            <label htmlFor="label">Label</label>
            <input
                type="text"
                name="label"
                defaultValue={element.extraAttributes.label}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
                className="bg-bg p-1 mb-3 mt-1 rounded-md outline-none"
            />
            <label htmlFor="placeholder">Placeholder</label>
            <input
                type="text"
                name="placeholder"
                defaultValue={element.extraAttributes.placeholder}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
                className="bg-bg p-1 mb-3 mt-1 rounded-md outline-none"
            />
            <label htmlFor="helperText">Helper text</label>
            <input
                type="text"
                name="helperText"
                defaultValue={element.extraAttributes.helperText}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                }}
                className="bg-bg p-1 mb-3 mt-1 rounded-md outline-none"
            />
            <div>
                <input
                    type="checkbox"
                    id="required"
                    name="required"
                    defaultChecked={element.extraAttributes.required}
                />
                <label htmlFor="required">Required</label>
            </div>
        </form>
    );
}

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } =
        element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">
                {label}
                {required && "*"}
            </label>
            <input
                className="bg-transparent ring-1 ring-bgSoft border border-bg me-7"
                type="text"
                readOnly
                disabled
                placeholder={placeholder}
            />
            {helperText && <p className="text-[0.8rem]">{helperText}</p>}
        </div>
    );
}
