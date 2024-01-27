"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
    count,
    per_page,
}: {
    count: number;
    per_page: number;
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const page = searchParams.get("page") || "1";
    const params = new URLSearchParams(searchParams);

    const hasPrev = per_page * (parseInt(page) - 1) > 0;
    const hasNext = per_page * (parseInt(page) - 1) + per_page < count;

    const handleChangePage = (type: string) => {
        type === "prev"
            ? params.set("page", (parseInt(page) - 1).toString())
            : params.set("page", (parseInt(page) + 1).toString());

        replace(`${pathname}?${params}`);
    };

    return (
        <div className="flex justify-between p-3">
            <button
                className="py-1 px-2 btn btn-ghost"
                disabled={!hasPrev}
                onClick={() => handleChangePage("prev")}
            >
                Previous
            </button>
            <button
                className="py-1 px-2 btn btn-ghost"
                disabled={!hasNext}
                onClick={() => handleChangePage("next")}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
