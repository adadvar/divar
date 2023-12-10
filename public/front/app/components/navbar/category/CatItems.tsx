"use client";
import { category } from "@/public/interfaces";
import CatItem from "./CatItem";

interface Props {
    categories: category[];
}

const CatItems = ({ categories }: Props) => {
    return (
        <div className="relative h-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10">
            {categories.map((c) => (
                <CatItem key={c.id} category={c} />
            ))}
        </div>
    );
};

export default CatItems;
