"use client";
import { useRef, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrowAlt as RightIcon } from "react-icons/bi";
import { useGlobal } from "@/app/store/global-store";

const SearchMobOverlay = () => {
    const { typeDialog, setTypeDialog } = useGlobal();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    const dispatch = useDispatch();
    return (
        <>
            <div className="lg:hidden flex flex-col absolute top-0 left-0 right-0 bottom-0  bg-white m-auto rounded-md w-full h-full z-50">
                <div className="flex justify-start text-gray-600 text-sm font-bold shadow-sm py-3 px-4">
                    <button
                        className="text-xl"
                        onClick={() => setTypeDialog("")}
                    >
                        <RightIcon />
                    </button>
                    <form className="flex">
                        <input
                            ref={inputRef}
                            type="text"
                            className="bg-transparent outline-none ms-5"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default SearchMobOverlay;
