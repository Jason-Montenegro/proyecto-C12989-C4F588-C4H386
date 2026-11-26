"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";
import styles from "./HeaderNav.module.css";

type NavLink = { href: string; label: string; icon: string; cta?: boolean };

const publicLinks: NavLink[] = [
  { href: "/", label: "Inicio", icon: styles.iconHome },
  { href: "/how-to-play", label: "Cómo jugar", icon: styles.iconQuestion },
  { href: "/about", label: "Sobre Nosotros", icon: styles.iconInformation },
  { href: "/credits", label: "Créditos", icon: styles.iconStar },
];

const guestLinks: NavLink[] = [
  { href: "/login", label: "Iniciar sesión", icon: styles.iconLogin },
  { href: "/register", label: "Registrarse", icon: styles.iconRegister },
];

const playLink: NavLink = {
  href: "/lobby",
  label: "Jugar ahora",
  icon: styles.iconPlay,
  cta: true,
};

function NavList({ className }: { className: string }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const links = [
    ...publicLinks,
    ...(!loading && !user ? guestLinks : []),
    playLink,
  ];

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <ul className={className}>
      {links.map(({ href, label, icon, cta }) => (
        <li key={href}>
          <Link
            href={href}
            className={`${styles.link} ${icon} ${cta ? styles.cta : ""}`}
          >
            {label}
          </Link>
        </li>
      ))}
      {user && (
        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="button buttonSecondary"
          >
            Cerrar sesión
          </button>
        </li>
      )}
    </ul>
  );
}

export default function HeaderNav() {
  return (
    <nav aria-label="Navegación principal" className={styles.nav}>
      <NavList className={styles.desktopList} />
      <details className={styles.mobileMenu}>
        <summary className={styles.toggle}>
          <span className="visuallyHidden">Menú</span>
        </summary>
        <NavList className={styles.mobileList} />
      </details>
    </nav>
  );
}
