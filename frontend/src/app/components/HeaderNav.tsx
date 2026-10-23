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
          <Link href="/ingame">Jugar ahora</Link>
        </li>
        <li>
          <Link href="/lobby">Ir al lobby</Link>
        </li>
        <li>
          <Link href="/results">Resultados</Link>
        </li>
        <li>
          <Link href="/login">Iniciar sesión</Link>
        </li>
        <li>
          <Link href="/register">Registrarse</Link>
        </li>
        <li>
          <Link href="/credits">Créditos</Link>
        </li>
      </ul>
    </nav>
  );
}
