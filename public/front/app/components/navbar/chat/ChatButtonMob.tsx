"use client";

import { useGlobal } from "@/app/store/auth-store";
import { DIALOG_TYPE_CHAT_MOB } from "@/public/utils";
import React from "react";
import { BsFillChatFill as ChatIcon } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ChatButtonMob = () => {
    const typeDialog = useGlobal.getState().typeDialog;
    const setTypeDialog = useGlobal.getState().setTypeDialog;
    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeDialog == DIALOG_TYPE_CHAT_MOB
                    ? "text-red-700"
                    : "text-gray-800"
            }`}
            onClick={() => setTypeDialog(DIALOG_TYPE_CHAT_MOB)}
        >
            <div className="text-xl">
                <ChatIcon />
            </div>
            <p className="text-xs">چت</p>
        </button>
    );
};

export default ChatButtonMob;
