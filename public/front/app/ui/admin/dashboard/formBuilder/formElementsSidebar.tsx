import React from "react";
import SiderbarBtnElement from "./siderbarBtnElement";
import { FormElements } from "./formElements";

const FormElementsSidebar = () => {
    return (
        <div>
            Elements
            <SiderbarBtnElement formElement={FormElements.TextField} />
        </div>
    );
};

export default FormElementsSidebar;
