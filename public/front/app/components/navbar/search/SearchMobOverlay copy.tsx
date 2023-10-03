"use client";
import { useRef, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { closeDialog } from "@/app/GlobalRedux/features/global/globalSlice";
import { BiRightArrowAlt as RightIcon } from "react-icons/bi";

const SearchMobOverlay = () => {
    const typeOpenDialog = useSelector(
        (state: RootState) => state.global.typeOpenDialog
    );
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
                        onClick={() => dispatch(closeDialog())}
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
