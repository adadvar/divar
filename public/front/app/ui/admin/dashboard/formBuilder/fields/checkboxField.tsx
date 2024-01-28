import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import { IoMdCheckbox } from "react-icons/io";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
    label: "Checkbox field",
    helperText: "Helper text",
    required: false,
};

export const CheckboxFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: IoMdCheckbox,
        label: "Checkbox Field",
    },
    desingerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (
        formElement: FormElementInstance,
        currentValue: string
    ): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required) {
            return currentValue === "true";
        }

        return true;
    },
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
            form.helperText.value = element.extraAttributes.helperText;
            form.required.checked = element.extraAttributes.required;
        }
    }, [element, formRef]);

    function applyChange(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const label = formData.get("label") as string;
        const helperText = formData.get("helperText") as string;
        const required = formData.get("required") === "on";

        updateDesingerElement(element.id, {
            ...element,
            extraAttributes: {
                label,
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
                className="input bg-bg p-1 mb-3 mt-1 rounded-md outline-none"
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
    const { label, required, helperText } = element.extraAttributes;
    const id = `checkbox-${element.id}`;
    return (
        <div className="flex space-x-2">
            <input type="checkbox" id={id} />
            <div className="grid gap-1.5 leading-none">
                <label htmlFor={id}>
                    {label}
                    {required && "*"}
                </label>

                {helperText && <p className="text-[0.8rem]">{helperText}</p>}
            </div>
        </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    defaultValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}) {
    const element = elementInstance as CustomInstance;
    const [value, setValue] = useState<boolean>(
        defaultValue === "true" ? true : false
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid == true);
    }, [isInvalid]);

    const { label, required, placeholder, helperText } =
        element.extraAttributes;
    const id = `checkbox-${element.id}`;
    const handleValueChange = (event: any) => {
        const selectedValue = event.target.checked;
        let value = false;
        if (selectedValue === true) value = true;
        setValue(value);
        if (submitValue) {
            const stringValue = value ? "true" : "false";
            const valid = CheckboxFieldFormElement.validate(
                element,
                stringValue
            );
            setError(!valid);
            submitValue(element.id, stringValue);
        }
    };
    return (
        <div className="flex space-x-2">
            <input
                type="checkbox"
                id={id}
                checked={value}
                className={`${error && "border-red-600"}`}
                onChange={handleValueChange}
            />
            <div className="grid gap-1.5 leading-none">
                <label htmlFor={id} className={`${error && "text-red-600"}`}>
                    {label}
                    {required && "*"}
                </label>

                {helperText && (
                    <p className={`text-[0.8rem] ${error && "text-red-600"}`}>
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
