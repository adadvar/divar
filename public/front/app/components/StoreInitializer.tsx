"use client";
import { useGlobal } from "@/app/src/global-store";
import { useRef } from "react";

const StoreInitializer = () => {
    const initialized = useRef(false);
    if (!initialized.current) {
        // useGlobal.setState({ typeDialog });
        initialized.current = true;
    }
    return null;
};

export default StoreInitializer;
