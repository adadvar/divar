import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import { RxDropdownMenu } from "react-icons/rx";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

const type: ElementsType = "SelectField";

const extraAttributes = {
    label: "select field",
    helperText: "Helper text",
    required: false,
    placeholder: "Value here ...",
    options: [],
};

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: RxDropdownMenu,
        label: "Select Field",
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
    const { updateDesingerElement, setSelectedDesignerElements } = useTmp();
    const element = elementInstance as CustomInstance;
    const formRef = useRef<HTMLFormElement>(null);
    const [options, setOptions] = useState<string[]>(
        element.extraAttributes.options
    );

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
                options,
            },
        });
        toast.success("Propserties saved successfully");
        setSelectedDesignerElements(null);
    }

    function handleAddOption(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOptions([...options, "New option"]);
    }

    function handleOptionChange(index: number, value: string) {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    }

    return (
        <form ref={formRef} onSubmit={applyChange}>
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
            <hr />
            <div className="flex justify-between items-center my-3">
                <label htmlFor="options">Options</label>
                <button className="btn flex gap-2" onClick={handleAddOption}>
                    <AiOutlinePlus />
                    Add
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-1"
                    >
                        <input
                            type="text"
                            placeholder=""
                            value={option}
                            className="bg-bg p-1 rounded-md outline-none"
                            onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                            }
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                const newOptions = [...options];
                                newOptions.splice(index, 1);
                                setOptions(newOptions);
                            }}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                ))}
            </div>
            <hr />
            <div>
                <input
                    type="checkbox"
                    id="required"
                    name="required"
                    className="my-4"
                    defaultChecked={element.extraAttributes.required}
                />
                <label htmlFor="required">Required</label>
            </div>
            <button className="btn btn-info w-full" type="submit">
                Save
            </button>
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
            <select className="bg-transparent ring-1 ring-bgSoft border border-bg me-7">
                <option value="">{placeholder}</option>
            </select>
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
    const [value, setValue] = useState(defaultValue || "");
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { label, required, placeholder, helperText, options } =
        element.extraAttributes;

    const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setValue(selectedValue);
        if (submitValue) {
            const valid = SelectFieldFormElement.validate(
                element,
                selectedValue
            );
            setError(!valid);
            submitValue(element.id, selectedValue);
        }
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
            <select
                className={`bg-transparent input w-full text-black border-gray-400 focus:border-red-800 mb-4 ${
                    error ? "border-red-600" : ""
                }`}
                defaultValue={value}
                onChange={handleValueChange}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {helperText && (
                <p
                    className={`text-sm font-bold text-gray-500 ${
                        error ? "text-red-600" : ""
                    }`}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
