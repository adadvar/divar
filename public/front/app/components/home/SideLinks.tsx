import Link from "next/link";

const SideLinks = () => {
    return (
        <div className="flex flex-wrap items-center  text-xs text-gray-600 my-5 gap-7">
            <Link href={"/about"}>درباره دیوار</Link>
            <Link href={"/about"}>دریافت برنامه</Link>
            <Link href={"/about"}>اتاق خبر</Link>
            <Link href={"/about"}>کسب و کارها</Link>
            <Link href={"/about"}>قوانین و پشتیبانی</Link>
        </div>
    );
};

export default SideLinks;
