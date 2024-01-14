import HomeContent from "@/app/ui/home-content";
import SetData from "../ui/SetData";
import { city } from "@/public/interfaces";
import { getCities, listAdverts, listCategories } from "../lib/data";
import { cookies } from "next/headers";

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const adverts = await listAdverts({ page: 1, slug: [], ...searchParams });
    const cities: city[] = await getCities();

    const categories = await listCategories();
    let cookie: any = cookies().get("token");
    const token = cookie && JSON.parse(cookie.value);
    cookie = cookies().get("me");
    const me = cookie && JSON.parse(cookie.value);
    return (
        <>
            <SetData
                categories={categories}
                cities={cities}
                token={token}
                me={me}
            />
            <HomeContent
                adverts={adverts}
                categories={categories}
                searchParams={searchParams}
                slug={[]}
            />
        </>
    );
}
