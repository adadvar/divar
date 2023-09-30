"use client";
import CatItem from "./CatItem";

// interface Props {
//     cats: [
//         {
//             id: number;
//             title: string;
//             slug: string;
//             parent_id: number | null;
//             icon: string | null;
//             child: cats;
//         }
//     ];
// }

interface cats {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    icon: string | null;
    child: childCats[];
}

interface childCats {
    id: number;
    title: string;
    slug: string;
    parent_id: number | null;
    icon: string | null;
    child: childCats[];
}

interface Props {
    cats: cats[];
}

const CityItems = ({ cats }: Props) => {
    return (
        <div className="relative h-full overflow-y-scroll overflow-x-hidden snap-y snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-100/20 scrollbar-thumb-gray-400/20 px-10">
            {cats.map((c) => (
                <CatItem key={c.id} item={c} />
            ))}
        </div>
    );
};

export default CityItems;
