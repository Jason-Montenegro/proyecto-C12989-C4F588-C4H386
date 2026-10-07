import Image from "next/image";
import Link from "next/link";
import icon from "@/../public/icon.svg";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header>
        <Link href="/">Volver al inicio</Link>
        <Image
          src={icon}
          alt="Hurry to the Top Logo"
          width={300}
          height={300}
        />
      </header>
      {children}
    </>
  );
}
