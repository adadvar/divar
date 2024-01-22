"use client";

import {
    FormElementInstance,
    FormElements,
} from "@/app/ui/admin/dashboard/formBuilder/formElements";
import React from "react";

const FormCateory = ({
    slug,
    content,
}: {
    slug: string;
    content: FormElementInstance[];
}) => {
    console.log(content);
    return (
        <div className="">
            <p className="">ثبت آگهی</p>
            <p className="">عکس آگهی</p>
            {content &&
                content.map((el) => {
                    const FormElement = FormElements[el.type].formComponent;
                    return <FormElement key={el.id} elementInstance={el} />;
                })}
        </div>
    );
};

export default FormCateory;
