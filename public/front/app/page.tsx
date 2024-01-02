import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";
import HomeContent from "@/app/components/home-content";

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

    const categories = await listCategories();

    return (
        <HomeContent
            adverts={adverts}
            categories={categories}
            queryParams={queryParams}
            slug={[]}
        />
    );
}
