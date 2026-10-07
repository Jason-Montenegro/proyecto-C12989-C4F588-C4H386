import Link from "next/link";
import Image from "next/image";
import HeaderNav from "@/app/components/HeaderNav";
import icon from "@/../public/icon.svg";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <Image
          src={icon}
          width={40}
          height={40}
          alt="Hurry to the Top Logo"
        />
      </Link>
      <HeaderNav />
    </header>
  );
}
