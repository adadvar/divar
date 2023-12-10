import Link from "next/link";

const SideLinks = () => {
    return (
        <div className="flex flex-wrap items-center text-xs text-gray-600 my-5 gap-7">
            <Link href={"/about"}>
                <span className="hover:text-gray-800">درباره دیوار</span>
            </Link>
            <Link href={"/download"}>
                <span className="hover:text-gray-800">دریافت برنامه</span>
            </Link>
            <Link href={"/news"}>
                <span className="hover:text-gray-800">اتاق خبر</span>
            </Link>
            <Link href={"/business"}>
                <span className="hover:text-gray-800">کسب و کارها</span>
            </Link>
            <Link href={"/terms"}>
                <span className="hover:text-gray-800">قوانین و پشتیبانی</span>
            </Link>
        </div>
    );
};

export default SideLinks;
