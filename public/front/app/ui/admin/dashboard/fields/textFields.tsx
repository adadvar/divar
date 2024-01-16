"use client";

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
    propertiesComponent: () => <div>Properties component</div>,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

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
