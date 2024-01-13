import { getCities, listAdverts, listCategories } from "@/app/lib/data";
import SetData from "@/app/ui/SetData";
import HomeContent from "@/app/ui/home-content";
import { category, city } from "@/public/interfaces";

export default async function Home({
    searchParams,
    params,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { slug: string[] };
}) {
    const adverts = await listAdverts({
        page: 1,
        slug: params.slug,
        ...searchParams,
    });

    const cities: city[] = await getCities();

    const categories: category[] = await listCategories();
    return (
        <>
            <SetData categories={categories} cities={cities} />
            <HomeContent
                adverts={adverts}
                categories={categories}
                searchParams={searchParams}
                slug={params.slug}
            />
        </>
    );
}
