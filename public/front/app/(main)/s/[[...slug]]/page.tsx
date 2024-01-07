import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";
import { getCities } from "@/app/actions/global-actions";
import SetData from "@/app/ui/SetData";
import HomeContent from "@/app/ui/home-content";
import { useGlobal } from "@/app/store/global-store";
import { category, city } from "@/public/interfaces";

export default async function Home({
    searchParams,
    params,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    params: { slug: string[] };
}) {
    const queryParams: { [key: string]: string | string[] | undefined } = {
        ...searchParams,
    };

    const adverts = await listAdverts({
        page: 1,
        slug: params.slug,
        ...queryParams,
    });

    const cities: city[] = await getCities();

    const categories: category[] = await listCategories();

    return (
        <>
            <SetData categories={categories} cities={cities} />;
            <HomeContent
                adverts={adverts}
                categories={categories}
                queryParams={queryParams}
                slug={params.slug}
            />
        </>
    );
}
