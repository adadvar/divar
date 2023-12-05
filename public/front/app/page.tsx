import MobCatList from "@/app/components/home/MobCatList";
import AdvertList from "./components/home/AdvertList";
import Sidebar from "./components/home/Sidebar";

export default function Home() {
    return (
        <main className="py-20 px-2">
            <MobCatList />
            <div className="flex">
                <div className="lg:block hidden w-[30%]">
                    <Sidebar />
                </div>
                <div className="lg:w-[70%] w-full">
                    <AdvertList />
                </div>
            </div>
        </main>
    );
}
