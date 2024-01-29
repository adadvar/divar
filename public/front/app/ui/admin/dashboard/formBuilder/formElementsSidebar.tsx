import React from "react";
import SiderbarBtnElement from "./siderbarBtnElement";
import { FormElements } from "./formElements";

const FormElementsSidebar = () => {
    return (
        <div>
            <p className="text-sm text-white/70">Drag and drop elements</p>
            <hr className="my-4 " />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
                <p className="text-sm col-span-1 md:col-span-2 my-2 place-self-start">
                    Layout elements
                </p>
                <SiderbarBtnElement formElement={FormElements.TitleField} />
                <SiderbarBtnElement formElement={FormElements.SubTitleField} />
                <SiderbarBtnElement formElement={FormElements.ParagraphField} />
                <SiderbarBtnElement formElement={FormElements.SeparatorField} />
                <SiderbarBtnElement formElement={FormElements.SpacerField} />

                <p className="text-sm col-span-1 md:col-span-2 my-2 place-self-start">
                    Form elements
                </p>
                <SiderbarBtnElement formElement={FormElements.TextField} />
                <SiderbarBtnElement formElement={FormElements.NumberField} />
                <SiderbarBtnElement formElement={FormElements.TextAreaField} />
                <SiderbarBtnElement formElement={FormElements.DateField} />
                <SiderbarBtnElement formElement={FormElements.SelectField} />
                <SiderbarBtnElement formElement={FormElements.CheckboxField} />
                <SiderbarBtnElement formElement={FormElements.ImageField} />
            </div>
        </div>
    );
};

export default FormElementsSidebar;
