import Link from "next/link";
import HeaderNav from "@/app/components/HeaderNav";
import icon from "@/../public/icon.svg";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <img
          src={icon.src}
          width={40}
          height={40}
          alt="Hurry to the Top Logo"
        />
      </Link>
      <HeaderNav />
    </header>
  );
}
