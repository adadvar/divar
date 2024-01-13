import HomeContent from "@/app/ui/home-content";
import SetData from "../ui/SetData";
import { city } from "@/public/interfaces";
import { getCities, listAdverts, listCategories } from "../lib/data";

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const adverts = await listAdverts({ page: 1, slug: [], ...searchParams });
    const cities: city[] = await getCities();

    const categories = await listCategories();

    return (
        <>
            <SetData categories={categories} cities={cities} />
            <HomeContent
                adverts={adverts}
                categories={categories}
                searchParams={searchParams}
                slug={[]}
            />
        </>
    );
}
