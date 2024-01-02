"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const useFilter = (key: string, value?: string) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
};

export default useFilter;
