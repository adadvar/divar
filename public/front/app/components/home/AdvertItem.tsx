import { advert } from "@/public/interfaces";
import { getAge } from "@/public/utils";
import Link from "next/link";
import {
    BiMessageRounded as ChatIcon,
    BiCameraOff as ImageIcon,
} from "react-icons/bi";

const AdvertItem = ({ advert }: { advert: advert }) => {
    return (
        <div className="flex w-full h-44 md:w-1/2 llg:w-1/3 xl:w-1/3 p-2">
            <Link
                href={"#"}
                className="flex justify-between w-full border border-gray-200 rounded box-border py-4 px-3"
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="text-gray-800 font-bold">
                        {advert.title}
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs mb-2">
                            {advert.category.title}
                        </p>
                        <p className="text-gray-400 text-xs">
                            {getAge(advert.age)}
                        </p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex h-full justify-center items-end w-5">
                        <ChatIcon />
                    </div>
                    <div
                        className="flex items-center justify-center h-full min-w-[126px] bg-gray-200
                    rounded text-4xl m-auto"
                    >
                        <ImageIcon />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AdvertItem;
