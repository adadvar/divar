import { advert } from "@/public/interfaces";
import { getAge } from "@/public/utils";
import Image from "next/image";
import Link from "next/link";
import {
    BiMessageRounded as ChatIcon,
    BiCameraOff as ImageIcon,
} from "react-icons/bi";

const LoadingPlaceholder = () => {
    return (
        <div className="animate-pulse flex w-full h-44 md:w-1/2 llg:w-1/3 xl:w-1/3 p-2">
            <div className="flex justify-between w-full border border-gray-200 rounded box-border py-4 px-3 h-full">
                <div className="flex flex-col justify-between h-full space-y-4">
                    {/* Placeholder for advert.title */}
                    <div className="bg-gray-300 h-6 w-32 rounded-md"></div>
                    <div className="space-y-2">
                        {/* Placeholder for advert.category.title */}
                        <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
                        {/* Placeholder for advert.age */}
                        <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
                    </div>
                </div>
                <div className="flex">
                    {/* Placeholder for chat icon */}
                    <div className="flex h-full justify-center items-end w-6 text-gray-200 text-xl">
                        <ChatIcon />
                    </div>
                    {/* Placeholder for advert image */}
                    <div className="flex items-center justify-center h-full min-w-[126px] bg-gray-200 rounded text-4xl m-auto">
                        <ImageIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdvertItem = ({ advert }: { advert: advert }) => {
    if (!advert) {
        return <LoadingPlaceholder />;
    }
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const image_url = BASE_URL + "adverts/" + advert.user_id + "/";

    return (
        <div className="flex w-full h-44 md:w-1/2 llg:w-1/3 xl:w-1/3 p-2">
            <Link
                href={`/adverts/v/${advert.slug_url}`}
                className="flex justify-between w-full border border-gray-200 rounded box-border py-4 px-3"
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="text-gray-800 font-bold">
                        {advert.title}
                    </div>
                    <div>
                        <p className="text-gray-500 font-bold text-xs mb-2">
                            {advert.category.title}
                        </p>
                        <p className="text-gray-500 font-bold text-xs">
                            {getAge(advert.age)}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex h-full justify-center items-end w-6 text-gray-500 text-xl">
                        <ChatIcon />
                    </div>
                    <div className="flex items-center justify-center h-full max-w-[126px] min-w-[126px] bg-gray-200 rounded text-4xl m-auto">
                        {advert.images ? (
                            <Image
                                src={image_url + advert.images[0]}
                                alt="advert image"
                                className="h-full w-full object-cover"
                                width={126}
                                height={126}
                                unoptimized={true}
                            />
                        ) : (
                            <ImageIcon />
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AdvertItem;
