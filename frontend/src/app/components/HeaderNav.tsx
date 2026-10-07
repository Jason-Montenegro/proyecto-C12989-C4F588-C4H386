import Link from "next/link";

export default function HeaderNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/how-to-play">Cómo jugar</Link>
        </li>
        <li>
          <Link href="/about">Sobre Nosotros</Link>
        </li>
        <li>
          <Link href="/play">Jugar ahora</Link>
        </li>
      </ul>
    </nav>
  );
}
