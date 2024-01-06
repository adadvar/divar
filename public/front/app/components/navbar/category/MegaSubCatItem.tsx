import { category } from "@/public/interfaces";
import Link from "next/link";
import RegularList from "../../RegularList";
import { useTmp } from "@/app/store/global-store";

const MegaSubCatItem = ({ category }: { category: category }) => {
    const { hoveredCatId, setHoveredCat } = useTmp();

    const subCatitem = hoveredCatId ? category?.child : [];

    return (
        <>
            <button
                // href={`/s/${city}/${category.slug}`}
                className="w-1/3 ps-10 w-30  my-1"
            >
                <p className="text-start text-xs font-bold text-gray-800 hover:text-red-800">
                    {category.title}
                </p>
            </button>
            <RegularList
                items={subCatitem}
                resourceName="category"
                ItemComponent={MegaSubCatItem}
            />
        </>
    );
};

export default MegaSubCatItem;
