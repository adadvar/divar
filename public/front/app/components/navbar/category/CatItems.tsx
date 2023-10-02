"use client";
import { cat } from "@/public/interfaces";
import CatItem from "./CatItem";

interface Props {
    cats: cat[];
}

const CatItems = ({ cats }: Props) => {
    console.log(cats);
    return (
        <div className="relative h-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10">
            {cats.map((c) => (
                <CatItem key={c.id} cat={c} />
            ))}
        </div>
    );
};

export default CatItems;
