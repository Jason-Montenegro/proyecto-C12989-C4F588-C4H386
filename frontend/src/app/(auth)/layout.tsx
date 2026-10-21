import Link from "next/link";
import HeaderNav from "@/app/components/HeaderNav";
import icon from "@/../public/icon.svg";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header>
        <Link href="/">Volver al inicio</Link>
        <HeaderNav />
        <img
          src={icon.src}
          alt="Hurry to the Top Logo"
          width={300}
          height={300}
        />
      </header>
      {children}
    </>
  );
}
