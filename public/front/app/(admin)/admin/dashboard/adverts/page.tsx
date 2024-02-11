import { listAdminAdverts } from "@/app/lib/data";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import { format } from "date-fns-jalali";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

const AdvertsPage = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: any;
}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const result = await listAdminAdverts({ q, slug: "", page });

    const adverts: any = result.adverts.data;
    const count = result.adverts.total;
    const per_page = result.adverts.per_page;
    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "categories/";

    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a category..." />
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-6">عنوان</td>
                        <td className="p-6">دسته بندی</td>
                        <td className="p-6">شهر</td>
                        <td className="p-6">وضعیت</td>
                        <td className="p-6">تاریخ ایجاد</td>
                    </tr>
                </thead>
                <tbody>
                    {adverts.map((adv: any) => (
                        <tr key={adv.id} className="hover:bg-bg">
                            <td className="p-6">{adv.title}</td>
                            <td className="p-6">{adv.category?.title}</td>
                            <td className="p-6">{adv.city?.name}</td>
                            <td className="p-6">{adv.state}</td>
                            <td className="p-6">
                                {format(new Date(adv.created_at), "yyyy-MM-dd")}
                            </td>
                            <td className="p-6">
                                <Link
                                    href={`/admin/dashboard/adverts/${adv.slug_url}`}
                                    className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600"
                                >
                                    View
                                </Link>
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
