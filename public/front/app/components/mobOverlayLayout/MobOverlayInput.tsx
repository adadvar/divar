import React, { useRef, useEffect } from "react";

interface MobOverlayInputProps {
    haveInput?: boolean;
}

const MobOverlayInput: React.FC<MobOverlayInputProps> = ({ haveInput }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <>
            {haveInput && (
                <form className="flex p-[5px]">
                    <input
                        ref={inputRef}
                        type="text"
                        className="bg-transparent outline-none ms-5"
                    />
                </form>
            )}
        </>
    );
};

export default MobOverlayInput;
