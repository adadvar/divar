import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";
import HomeContent from "@/app/components/home-content";

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

    const categories = await listCategories();

    return (
        <HomeContent
            adverts={adverts}
            categories={categories}
            queryParams={queryParams}
            slug={params.slug}
        />
    );
}
