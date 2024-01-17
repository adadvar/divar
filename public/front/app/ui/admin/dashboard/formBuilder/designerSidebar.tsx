import React from "react";
import SiderbarBtnElement from "./siderbarBtnElement";
import { FormElements } from "./formElements";
import { useTmp } from "@/app/store/global-store";
import FormElementsSidebar from "./formElementsSidebar";
import PropertiesFormSidebar from "./propertiesFormSidebar";

const DesignerSidebar = () => {
    const { selectedDesignerElements } = useTmp();
    return (
        <aside className="w-[400px] max-w[400px] flex flex-col flex-grow gap-2 p-4 overflow-y-auto h-full">
            {!selectedDesignerElements && <FormElementsSidebar />}
            {selectedDesignerElements && <PropertiesFormSidebar />}
        </aside>
    );
};

export default DesignerSidebar;
