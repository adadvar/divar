import { category } from "@/public/interfaces";
import Link from "next/link";
import RegularList from "../../RegularList";
import { useGlobal, useTmp } from "@/app/store/global-store";
import MegaSubSubCatItem from "./MegaSubSubCatItem";
import { useRouter, useSearchParams } from "next/navigation";

const MegaSubCatItem = ({ category }: { category: category }) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { replace } = useRouter();
    const { hoveredCatId, setTypeDialog } = useTmp();

    const subCatitem = hoveredCatId ? category?.child : [];
    const handleClick = () => {
        const url = `/s/iran/${category.slug}${
            params.toString() && `?${params.toString()}`
        }`;
        setTypeDialog("");
        replace(url);
    };
    return (
        <>
            <button className="w-1/3 ps-10 my-3" onClick={handleClick}>
                <p className="text-start text-xs text-gray-900 hover:text-red-800">
                    {category.title}
                </p>
            </button>
            <RegularList
                items={subCatitem}
                resourceName="category"
                ItemComponent={MegaSubSubCatItem}
            />
        </>
    );
};

export default MegaSubCatItem;
