import { listAdminAdverts } from "@/app/lib/data";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

const AdvertsPage = async ({ searchParams }: { searchParams: any }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const adverts: any = await listAdminAdverts({ slug: "", page });
    const count = adverts.total;
    const per_page = adverts.per_page;
    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "adverts/";
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a advert..." />
                <Link href="/admin/dashboard/adverts/add">
                    <button className="p-3 bg-[#5d57c9] text-text border-none rounded cursor-pointer">
                        Add New
                    </button>
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-3">Photo</td>
                        <td className="p-3">Title</td>
                        <td className="p-3">Category</td>
                        <td className="p-3">Created At</td>
                    </tr>
                </thead>
                <tbody>
                    {adverts.data.map((advert: any) => (
                        <tr key={advert.id}>
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {advert.images && advert.images[0] ? (
                                        <Image
                                            src={
                                                image_url +
                                                advert.user_id +
                                                "/" +
                                                advert.images[0]
                                            }
                                            alt=""
                                            width={40}
                                            height={40}
                                            className="object-cover rounded-full"
                                            unoptimized={true}
                                        />
                                    ) : (
                                        <MdPerson size={50} />
                                    )}
                                </div>
                            </td>
                            <td className="p-3">{advert.title}</td>
                            <td className="p-3">{advert.category.title}</td>
                            <td className="p-3">
                                {advert.created_at?.toString().slice(0, 10)}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-3">
                                    <Link
                                        href={`/admin/dashboard/adverts/${advert.id}`}
                                    >
                                        <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600">
                                            View
                                        </button>
                                    </Link>
                                    <form action={""}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={advert.id}
                                        />
                                        <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-rose-600">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination per_page={per_page} count={count} />
        </div>
    );
};

export default AdvertsPage;
