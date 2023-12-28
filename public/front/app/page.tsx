import { listAdverts } from "@/app/actions/advert-actions";
import { listCategories } from "@/app/actions/categoris-actions";
import HomeContent from "@/app/components/home-content";

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const price = searchParams.price ? searchParams.price.toString() : "0";

    const adverts = await listAdverts({ page: 1, price });

    const categories = await listCategories();

    return (
        <HomeContent
            adverts={adverts}
            categories={categories}
            searchParams={searchParams}
            slug={[]}
        />
    );
}
