import Advert from "@/app/ui/Advert/Advert";
import AdvertNavbar from "@/app/ui/Advert/AdvertNavbar";
import Navbar from "@/app/ui/navbar/Index";

const AdvertPage = ({
    params: { slug_url },
}: {
    params: { slug_url: string };
}) => {
    return (
        <>
            <AdvertNavbar />
            <main className="lg:flex-row-reverse flex-col gap-4 flex max-w-screen-lg mx-auto py-5 px-2">
                <Advert slug_url={slug_url} />
            </main>
        </>
    );
};

export default AdvertPage;
