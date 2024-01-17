import { useTmp } from "@/app/store/global-store";
import React from "react";
import { FormElements } from "./formElements";
import { AiOutlineClose } from "react-icons/ai";

const PropertiesFormSidebar = () => {
    const { selectedDesignerElements, setSelectedDesignerElements } = useTmp();
    if (!selectedDesignerElements) return null;
    const PropertiesForm =
        FormElements[selectedDesignerElements?.type].propertiesComponent;
    return (
        <div className="flex flex-col p-2">
            <div className="flex justify-between items-center">
                <p className="text-sm">Elements properties</p>
                <button
                    className=""
                    onClick={() => setSelectedDesignerElements(null)}
                >
                    <AiOutlineClose />
                </button>
            </div>
            <PropertiesForm elementInstance={selectedDesignerElements} />
        </div>
    );
};

export default PropertiesFormSidebar;
