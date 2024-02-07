import { listAdminAdverts } from "@/app/lib/data";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import { format } from "date-fns-jalali";

type Row = { [key: string]: string } & { createdAt: Date };

const AnswersPage = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: any;
}) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const slug = params.id;
    const result = await listAdminAdverts({ slug, page });

    const answers: any = result.answers.data;
    const count = result.answers.total;
    const per_page = result.answers.per_page;
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
                        <td className="p-3 text-center">عنوان</td>
                        <td className="p-3 text-center">دسته بندی</td>
                        <td className="p-3 text-center">شهر</td>
                        <td className="p-3 text-center">وضعیت</td>
                        <td className="p-3 text-center">تاریخ ایجاد</td>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((ans: any) => (
                        <tr key={ans.id} className="hover:bg-bg">
                            <td className="p-6 ">{ans.title}</td>
                            <td className="p-6 ">{ans.category?.title}</td>
                            <td className="p-6 ">{ans.city?.name}</td>
                            <td className="p-6 ">{ans.state}</td>
                            <td className="p-6 ">
                                {format(new Date(ans.created_at), "yyyy-MM-dd")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination per_page={per_page} count={count} />
        </div>
    );
};

export default AnswersPage;
