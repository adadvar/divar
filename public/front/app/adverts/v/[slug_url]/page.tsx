import Advert from "@/app/components/Advert/Advert";
import React from "react";

const AdvertPage = ({
    params: { slug_url },
}: {
    params: { slug_url: string };
}) => {
    return (
        <>
            <main className="max-w-screen-lg mx-auto py-5 px-2">
                <Advert slug_url={slug_url} />
            </main>
        </>
    );
};

export default AdvertPage;
