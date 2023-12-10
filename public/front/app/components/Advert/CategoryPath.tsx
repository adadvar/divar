import { category } from "@/public/interfaces";
import { BiChevronRight as ChevornRightIcon } from "react-icons/bi";

const CategoryPath = ({ path }: { path: category[] }) => {
    const pathElements = path.map((category, index) => (
        <div key={category.id}>
            <p>{category.title}</p>
            {index < path.length - 1 && <ChevornRightIcon />}
        </div>
    ));
    return <div>{pathElements}</div>;
};

export default CategoryPath;
