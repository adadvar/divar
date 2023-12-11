import React from "react";
import {
    BiRightArrowAlt as BackIcon,
    BiBookmark as BookmarkIcon,
    BiBookmarkAltPlus as AddCommentIcon,
    BiShareAlt as ShareIcon,
} from "react-icons/bi";
const AdvertNavbar = () => {
    return (
        <div className="shadow-sm fixed flex items-center h-16 top-0 left-0 right-0 bg-white z-40">
            <div className="flex justify-between w-full 2xl:container 2xl:px-16 px-5 mx-auto text-xl text-gray-500">
                <button className="w-3/4">
                    <BackIcon />
                </button>
                <div className="flex justify-between w-1/4">
                    <button>
                        <BookmarkIcon />
                    </button>
                    <button>
                        <AddCommentIcon />
                    </button>
                    <button>
                        <ShareIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdvertNavbar;
