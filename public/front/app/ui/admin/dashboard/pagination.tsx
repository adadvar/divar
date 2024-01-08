import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ count }: { count: number }) => {
    const searchParams = useSearchParams();
    const pathname = useParams();
    const { replace } = useRouter();

    const page = searchParams.get("page") || "1";
    const params = new URLSearchParams(searchParams);

    const PER_PAGE = 10;

    const hasPrev = PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext = PER_PAGE * (parseInt(page) - 1) + PER_PAGE < count;

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
                onClick={() => handleChangePage("prev")}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
