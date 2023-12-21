"use client";
import React, { useRef } from "react";
import { useGlobal } from "@/app/src/store/global-store";

const StoreInitializer = ({ typeDialog }: { typeDialog: string }) => {
    const initialized = useRef(false);
    if (!initialized.current) {
        useGlobal.setState({ typeDialog });
        initialized.current = true;
    }
    return null;
};

export default StoreInitializer;
