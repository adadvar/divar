import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";
import HomeContent from "@/app/components/home-content";
import SetData from "./components/SetData";
import { city } from "@/public/interfaces";
import { getCities } from "./actions/global-actions";

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const queryParams: {
        [key: string]: string | string[] | undefined;
    } = {
        ...searchParams,
        slug: [],
    };

    const adverts = await listAdverts({ page: 1, ...queryParams });
    const cities: city[] = await getCities();

    const categories = await listCategories();

    return (
        <>
            <SetData categories={categories} cities={cities} />;
            <HomeContent
                adverts={adverts}
                categories={categories}
                queryParams={queryParams}
                slug={[]}
            />
        </>
    );
}
