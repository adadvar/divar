import React from "react";
import { BsChat as ChatIcon } from "react-icons/bs";

const ChatButton = () => {
    return (
        <button className="btn btn-ghost btn-hover text-gray-500 hover:text-gray-800">
            <div className="text-xl">
                <ChatIcon />
            </div>
            <span className="text-xs">چت</span>
        </button>
    );
};

export default ChatButton;
