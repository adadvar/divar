import { findCategoryPath } from "@/public/utils";
import CategoryPathItem from "./CategoryPathItem";
import AdvertNavbar from "../navbar/AdvertNavbar";
import Slider from "../Slider";
import RegularList from "../RegularList";
import { advert, category } from "@/public/interfaces";
import advertActions from "@/app/actions/advert-actions";
import categoryActions from "@/app/actions/categoris-actions";

const Advert = async ({ slug_url }: { slug_url: string }) => {
    const advert: advert = await advertActions.show({ slug_url });
    const categories: category[] = await categoryActions.list();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const image_url = BASE_URL + "adverts/" + advert.user_id + "/";

    const childId = advert && advert.category_id;
    const foundPath = findCategoryPath(categories, childId);

    return (
        <>
            <AdvertNavbar />
            <Slider image_url={image_url} images={advert.images} />
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
            <div className="text-gray-800 ms-2 font-bold">{advert.title}</div>
        </>
    );
};

export default Advert;
