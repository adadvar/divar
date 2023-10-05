"use client";

import { openDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { RootState } from "@/app/GlobalRedux/store";
import { DIALOG_TYPE_CHAT_MOB } from "@/public/utils";
import React from "react";
import { BsFillChatFill as ChatIcon } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ChatButtonMob = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
    const dispatch = useDispatch();
    return (
        <button
            className={`flex flex-col items-center gap-1 px-2 m-0 ${
                typeOpenDialog == DIALOG_TYPE_CHAT_MOB
                    ? "text-red-900"
                    : "text-gray-800"
            }`}
            onClick={() => dispatch(openDialog(DIALOG_TYPE_CHAT_MOB))}
        >
            <div className="text-xl">
                <ChatIcon />
            </div>
            <p className="text-xs">چت</p>
        </button>
    );
};

export default ChatButtonMob;
