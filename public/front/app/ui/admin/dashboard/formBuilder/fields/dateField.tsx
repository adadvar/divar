import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { format } from "date-fns-jalali";

const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date field",
    helperText: "Pick a date",
    required: false,
};

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsFillCalendarDateFill,
        label: "Date Field",
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
            return currentValue.length > 0;
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
            <button className="btn bg-transparent w-full justify-start text-left font-normal">
                <BsFillCalendarDateFill className="ms-2 h-4 w-4" />
                <span>Pick a date</span>
            </button>
            {helperText && <p className="text-[0.8rem]">{helperText}</p>}
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
    const [date, setDate] = useState<Date | undefined>(
        defaultValue ? new Date(defaultValue) : undefined
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid == true);
    }, [isInvalid]);

    const { label, required, placeholder, helperText } =
        element.extraAttributes;
    return (
        <div className="flex flex-col w-full my-8">
            <label
                htmlFor=""
                className={`text-lg font-bold text-black mb-4 ${
                    error && "text-red-600"
                }`}
            >
                {label}
                {required && "*"}
            </label>
            <button
                className={`w-full justify-start text-start font-normal ${
                    !date && "text-black"
                } ${error && "border-red-600"}`}
            >
                <BsFillCalendarDateFill className="ms-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <input type="date" />
            </button>

            {helperText && (
                <p
                    className={`text-sm font-bold text-gray-500 ${
                        error && "text-red-600"
                    }`}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
