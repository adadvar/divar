import { findCategoryPath, getAge } from "@/app/lib/utils";
import CategoryPathItem from "./CategoryPathItem";
import AdvertNavbar from "./AdvertNavbar";
import Slider from "../Slider";
import RegularList from "../RegularList";
import { advert, category } from "@/public/interfaces";
import { listCategories, showAdvert } from "@/app/lib/data";

const Advert = async ({ slug_url }: { slug_url: string }) => {
    const advert: advert = await showAdvert({ slug_url });
    const categories: category[] = await listCategories({});

    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "adverts/" + advert.user_id + "/";

    const childId = advert && advert.category_id;
    const foundPath = findCategoryPath(categories, childId);

    return (
        <>
            <div className="w-full lg:w-1/2">
                <Slider image_url={image_url} images={advert.images} />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
                {foundPath && (
                    <div className="flex items-center text-center text-gray-500 text-xs font-bold my-7">
                        <RegularList
                            items={foundPath}
                            resourceName="category"
                            ItemComponent={CategoryPathItem}
                        />
                        <p className="text-gray-400 px-2">{advert.title}</p>
                    </div>
                )}
                <div className="text-xl text-gray-800  font-bold">
                    {advert.title}
                </div>
                <p className="text-sm text-gray-400  my-5">
                    {getAge(advert.age)}
                </p>
                <p className="text-lg text-gray-700 mb-3">توضیحات</p>
                <div className="text-base text-gray-800 leading-10 text-justify">
                    {advert.info}
                </div>
            </div>
        </>
    );
};

export default Advert;
