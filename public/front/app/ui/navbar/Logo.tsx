import logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

interface Props {
    size: number;
}

const Logo = ({ size }: Props) => {
    return (
        <Link href="/">
            <Image src={logo} width={size} height={size} alt=""></Image>
        </Link>
    );
};

export default Logo;
