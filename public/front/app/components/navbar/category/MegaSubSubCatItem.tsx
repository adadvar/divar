import { useGlobal } from "@/app/store/global-store";
import { category } from "@/public/interfaces";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const MegaSubSubCatItem = ({ category }: { category: category }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const { setTypeDialog } = useGlobal();
    const handleClick = () => {
        const url = `/s/iran/${category.slug}${
            params.toString() && `?${params.toString()}`
        }`;
        setTypeDialog("");
        replace(url);
    };
    return (
        <>
            <button className="w-1/3 ps-10 w-30  my-1" onClick={handleClick}>
                <p className="text-start text-xs text-gray-500 hover:text-red-800">
                    {category.title}
                </p>
            </button>
        </>
    );
};

export default MegaSubSubCatItem;
