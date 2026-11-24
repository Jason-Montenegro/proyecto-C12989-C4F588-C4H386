import Link from "next/link";
import styles from "./HeaderNav.module.css";

const links = [
  { href: "/", label: "Inicio", icon: styles.iconHome },
  { href: "/how-to-play", label: "Cómo jugar", icon: styles.iconQuestion },
  { href: "/about", label: "Sobre Nosotros", icon: styles.iconInformation },
  { href: "/lobby", label: "Ir al lobby", icon: styles.iconMultiplayer },
  { href: "/results", label: "Resultados", icon: styles.iconTrophy },
  { href: "/login", label: "Iniciar sesión", icon: styles.iconLogin },
  { href: "/register", label: "Registrarse", icon: styles.iconRegister },
  { href: "/credits", label: "Créditos", icon: styles.iconStar },
  { href: "/ingame", label: "Jugar ahora", icon: styles.iconPlay, cta: true },
];

function NavList({ className }: { className: string }) {
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
