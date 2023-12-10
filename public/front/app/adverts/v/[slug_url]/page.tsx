import Advert from "@/app/components/Advert/Advert";
import React from "react";

const AdvertPage = ({
    params: { slug_url },
}: {
    params: { slug_url: string };
}) => {
    return <Advert slug_url={slug_url} />;
};

export default AdvertPage;
