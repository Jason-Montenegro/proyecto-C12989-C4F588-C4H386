import Link from "next/link";
import HeaderNav from "@/app/components/HeaderNav";
import icon from "@/../public/icon.svg";
import styles from "./auth.module.css";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          Volver al inicio
        </Link>
        <HeaderNav />
        <img
          src={icon.src}
          alt="Hurry to the Top Logo"
          width={300}
          height={300}
          className={styles.logo}
        />
      </header>
      {children}
    </>
  );
}
