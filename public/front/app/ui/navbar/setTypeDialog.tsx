"use client";
import { useTmp } from "@/app/store/global-store";
import React from "react";

const SetTypeDialog = ({ text, type }: { text: string; type: string }) => {
    const { setTypeDialog } = useTmp();
    return <button onClick={() => setTypeDialog(type)}>{text}</button>;
};

export default SetTypeDialog;
