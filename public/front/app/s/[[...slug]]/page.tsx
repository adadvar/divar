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
    const price = searchParams?.price ? searchParams.price.toString() : "0";

    const adverts = await listAdverts({ page: 1, price, slug: params.slug });

    const categories = await listCategories();

    return (
        <HomeContent
            adverts={adverts}
            categories={categories}
            searchParams={searchParams}
            slug={params.slug}
        />
    );
}
