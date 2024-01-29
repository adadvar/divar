import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";
import { FaImage } from "react-icons/fa";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

const type: ElementsType = "ImageField";

const extraAttributes = {
    label: "Image field",
    helperText: "Helper text",
    required: false,
};

export const ImageFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: FaImage,
        label: "Image Field",
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
    const { label, required, helperText } = element.extraAttributes;
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
            />
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
    const [values, setValues] = useState<string[]>(
        defaultValue ? [defaultValue] : []
    );
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(!!isInvalid);
    }, [isInvalid]);

    const { label, required, helperText } = element.extraAttributes;

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const newValues = [...values];
                newValues[index] = e.target?.result as string;
                setValues(newValues);
                if (submitValue) {
                    submitValue(element.id, e.target?.result as string);
                }
                console.log(newValues);
            };
            reader.readAsDataURL(file);
        }
    };

    const addInput = () => {
        setValues([...values, ""]);
    };

    return (
        <div className="flex flex-col w-full my-8">
            <label
                htmlFor=""
                className={`text-lg font-bold text-black mb-4 ${
                    error ? "text-red-600" : ""
                }`}
            >
                {label}
                {required && "*"}
            </label>
            {values.map((value, index) => (
                <div key={index}>
                    {value && (
                        <div className="mb-4">
                            <Image
                                src={value}
                                alt={`Image preview ${index}`}
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                    <div className="flex items-center mb-4">
                        <input
                            className={`bg-transparent w-full text-black border-gray-400 focus:border-red-800 ${
                                error ? "border-red-600" : ""
                            }`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, index)}
                        />
                    </div>
                </div>
            ))}
            {helperText && (
                <p
                    className={`text-sm font-bold text-gray-500 ${
                        error ? "text-red-600" : ""
                    }`}
                >
                    {helperText}
                </p>
            )}
            <AiOutlinePlus
                className="w-6 h-6 text-gray-600 ml-3 cursor-pointer"
                onClick={addInput}
            />
        </div>
    );
}
