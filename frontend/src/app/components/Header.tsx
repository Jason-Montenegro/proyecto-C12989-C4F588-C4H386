import Link from "next/link";
import HeaderNav from "@/app/components/HeaderNav";
import icon from "@/../public/icon.svg";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
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
