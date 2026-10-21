import Link from "next/link";
import icon from "@/../public/icon.svg";
import group from "@/../public/group.png";
import HeaderNav from "@/app/components/HeaderNav";

export default function LobbyPage() {
  return (
    <>
      <header>
        <Link href="/">
          <img src={icon.src} alt="Hurry to the Top" width={64} height={64} />
        </Link>
        <p>PlayerName</p>
        <HeaderNav />
        <nav aria-label="Cuenta del jugador">
          <Link href="/login">Mi cuenta</Link>
        </nav>
      </header>

      <main>
        <h1>Lobby de partidas</h1>

        <section>
          <h2>Buscar partida</h2>
          <img
            src={group.src}
            alt="Grupo de jugadores"
            width={300}
            height={300}
          />
          <button type="button">Buscar</button>
        </section>

        <section>
          <h2>Unirse a partida</h2>
          <form>
            <label htmlFor="codigo-partida">Código de partida</label>
            <input
              type="text"
              id="codigo-partida"
              name="codigo-partida"
              required
            />
            <button type="button">Unirse</button>
          </form>
        </section>

        <section>
          <h2>Crear partida</h2>
          <img
            src={icon.src}
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
