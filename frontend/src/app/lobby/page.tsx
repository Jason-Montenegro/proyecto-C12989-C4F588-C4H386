import Link from "next/link";
import Image from "next/image";
import icon from "@/../public/icon.svg";
import group from "@/../public/group.png";

export default function LobbyPage() {
  return (
    <>
      <header>
        <Link href="/">
          <Image src={icon} alt="Hurry to the Top" width={64} height={64} />
        </Link>
        <p>PlayerName</p>
        <nav aria-label="Cuenta del jugador">
          <Link href="/login">Mi cuenta</Link>
        </nav>
      </header>

      <main>
        <h1>Lobby de partidas</h1>

        <section>
          <h2>Buscar partida</h2>
          <Image
            src={group}
            alt="Grupo de jugadores"
            width={300}
            height={300}
          />
          <button type="button">Buscar</button>
        </section>

        <section>
          <h2>Unirse a partida</h2>
          <form action="#" method="get">
            <label htmlFor="codigo-partida">Código de partida</label>
            <input
              type="text"
              id="codigo-partida"
              name="codigo-partida"
              required
            />
            <button type="submit">Unirse</button>
          </form>
        </section>

        <section>
          <h2>Crear partida</h2>
          <Image
            src={icon}
            alt="Logo de Hurry to the Top"
            width={180}
            height={180}
          />
          <button type="button">Crear</button>
        </section>
      </main>

      <footer>
        <nav aria-label="Navegación del lobby">
          <ul>
            <li>
              <Link href="/lobby">Partida</Link>
            </li>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>Buzón</li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
