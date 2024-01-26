"use client";

import { createAnswer } from "@/app/lib/actions";
import {
    FormElementInstance,
    FormElements,
} from "@/app/ui/admin/dashboard/formBuilder/formElements";
import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";

const FormCategory = ({
    slug,
    content,
}: {
    slug: string;
    content: FormElementInstance[];
}) => {
    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime());

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, []);

    const validateForm: () => boolean = useCallback(() => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);

            if (!valid) {
                formErrors.current[field.id] = true;
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false;
        }

        return true;
    }, [content]);

    const submitForm = async () => {
        formErrors.current = {};
        const validForm = validateForm();
        if (!validForm) {
            setRenderKey(new Date().getTime());
            toast.error("please check the form for errors");
            return;
        }
        const result = await createAnswer({
            slug,
            content: formValues.current,
        });
        if (result?.message) {
            toast.error(result.message);
        } else {
            toast.success("با موفقیت ذخیره شد");
        }
    };

    return (
        <div className="" key={renderKey}>
            <p className="">ثبت آگهی</p>
            <p className="">عکس آگهی</p>
            {content &&
                content.map((el) => {
                    const FormElement = FormElements[el.type].formComponent;
                    return (
                        <FormElement
                            key={el.id}
                            elementInstance={el}
                            submitValue={submitValue}
                            isInvalid={formErrors.current[el.id]}
                            defaultValue={formValues.current[el.id]}
                        />
                    );
                })}
            <div className="flex justify-end gap-x-2 my-5">
                <button className="btn btn-ghost btn-hover border border-gray-500 text-gray-500 hover:text-gray-600">
                    انصراف
                </button>
                <button
                    className="btn btn-ghost btn-hover text-white bg-red-700 hover:bg-red-600"
                    onClick={() => submitForm()}
                >
                    ارسال آگهی
                </button>
            </div>
        </div>
    );
};

export default FormCategory;
