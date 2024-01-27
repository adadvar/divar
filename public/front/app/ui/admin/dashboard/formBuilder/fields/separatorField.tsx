import { useEffect, useRef, useState } from "react";
import { useTmp } from "@/app/store/global-store";
import { RiSeparator } from "react-icons/ri";
import {
    ElementsType,
    FormElement,
    FormElementInstance,
    SubmitFunction,
} from "../formElements";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
    }),
    designerBtnElement: {
        icon: RiSeparator,
        label: "Separator field",
    },
    desingerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: () => true,
};

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return <p>No properties for this element</p>;
}

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Separator field</label>
            <hr />
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
    return <hr />;
}
