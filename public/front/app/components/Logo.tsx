import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link href="/">
            <Image src={logo} width={50} height={50} alt=""></Image>
        </Link>
    );
};

export default Logo;
