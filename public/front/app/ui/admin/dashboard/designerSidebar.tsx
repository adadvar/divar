import React from "react";
import SiderbarBtnElement from "./siderbarBtnElement";
import { FormElements } from "./formElements";

const DesignerSidebar = () => {
    return (
        <aside className="w-[400px] max-w[400px] flex flex-col flex-grow gap-2 p-4 overflow-y-auto h-full">
            Elements
            <SiderbarBtnElement formElement={FormElements.TextField} />
        </aside>
    );
};

export default DesignerSidebar;
