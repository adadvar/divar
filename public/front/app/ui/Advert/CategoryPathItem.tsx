import { category } from "@/public/interfaces";
import { BiChevronLeft as ChevornLeftIcon } from "react-icons/bi";

const CategoryPathItem = ({ category }: { category: category }) => {
    return (
        <div className="flex items-center text-center">
            <button className="me-2 hover:text-gray-600">
                {category.title}
            </button>
            <div className="text-lg me-2">
                <ChevornLeftIcon />
            </div>
        </div>
    );
};

export default CategoryPathItem;
