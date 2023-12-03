"use client";

import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";

const MobCatList = () => {
    const cats = useSelector(
        (state: RootState) => state.global.data.categories
    );
    return (
        <>
            {cats &&
                Object.keys(cats).map((catKey) => {
                    const cat = cats[Number(catKey)];
                    if (cat.parent_id === null) {
                        return (
                            <div className="p-10" key={cat.id}>
                                <p>{cat.title}</p>
                                {/* Further rendering logic for child categories if needed */}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
        </>
    );
};

export default MobCatList;
