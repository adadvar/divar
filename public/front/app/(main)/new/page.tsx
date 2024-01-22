import { getForm, listCategories, showCategory } from "@/app/lib/data";
import RegularList from "@/app/ui/RegularList";
import CatItem from "@/app/ui/new/CatItem";
import Link from "next/link";
import { BsArrowRightShort as BackIcon } from "react-icons/bs";
import FormCateory from "./formCateory";

const page = async ({ searchParams }: { searchParams: any }) => {
    const q = searchParams?.q || "";
    const slug = searchParams?.slug || "";
    const categories: any = slug
        ? await showCategory({ q, slug })
        : await listCategories({ q });
    const form = slug && getForm(slug);
    console.log(form);
    return (
        <main className="flex justify-center items-center h-full w-full">
            <div className="flex flex-col gap-2 m-auto w-1/3 min-h-[80%] max-h-[80%] mt-10">
                {categories.length > 0 ? (
                    <>
                        <p className="text-gray-700 text-lg">ثبت آگهی</p>
                        <p className="text-gray-600 text-sm">
                            انتخاب دسته بندی
                        </p>
                        {slug ? (
                            <Link href={"/new"} className="flex text-gray-800">
                                <div className="text-2xl py-1 text-gray-600">
                                    <BackIcon />
                                </div>
                                <p className=" my-1">بازگشت به همه دسته ها</p>
                            </Link>
                        ) : null}
                        <RegularList
                            items={categories}
                            resourceName="category"
                            ItemComponent={CatItem}
                        />
                    </>
                ) : (
                    <FormCateory content={form.content} slug={slug} />
                )}
            </div>
        </main>
    );
};

export default page;
