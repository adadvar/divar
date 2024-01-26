import { listCategories, showCategory } from "@/app/lib/data";
import { findCategory } from "@/app/lib/utils";
import AddCategoryDialogBtn from "@/app/ui/admin/dashboard/addCategoryDialogBtn";
import Pagination from "@/app/ui/admin/dashboard/pagination";
import Search from "@/app/ui/admin/dashboard/search";
import Image from "next/image";
import Link from "next/link";
import { MdPerson } from "react-icons/md";

const CategoriesPage = async ({ searchParams }: { searchParams: any }) => {
    const q = searchParams?.q || "";
    const page = searchParams?.page || 1;
    const slug = searchParams?.slug || "";

    const categories: any = slug
        ? await showCategory({ q, page, slug })
        : await listCategories({ q, page });
    const count = categories.total;
    const per_page = categories.per_page;
    const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
    const image_url = BASE_URL + "categories/";
    return (
        <div className="bg-bgSoft p-5 rounded-lg mt-5">
            <div className="flex items-center justify-between">
                <Search placeholder="Search for a category..." />
                <AddCategoryDialogBtn />
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-3">Photo</td>
                        <td className="p-3">Title</td>
                        <td className="p-3">Created At</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.data.map((category: any) => (
                        <tr key={category.id}>
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    {category.icon ? (
                                        <Image
                                            src={
                                                image_url +
                                                category.user_id +
                                                "/" +
                                                category.icon
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
                            <td className="p-3">{category.title}</td>
                            <td className="p-3">
                                {category.created_at?.toString().slice(0, 10)}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-3">
                                    {category.child.length > 0 ? (
                                        <Link
                                            href={`/admin/dashboard/categories?slug=${category.slug}`}
                                        >
                                            <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600">
                                                View Child
                                            </button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={`/admin/dashboard/categories/${category.slug}`}
                                            >
                                                <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600">
                                                    Add Form
                                                </button>
                                            </Link>
                                            <Link
                                                href={`/admin/dashboard/answers/${category.slug}`}
                                            >
                                                <button className="py-1 px-2 rounded-md text-text border-none cursor-pointer bg-teal-600">
                                                    View Answers
                                                </button>
                                            </Link>
                                        </>
                                    )}

                                    <form action={""}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={category.id}
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

export default CategoriesPage;
