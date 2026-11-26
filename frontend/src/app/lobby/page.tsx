"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import icon from "@/../public/icon.svg";
import group from "@/../public/group.png";
import HeaderNav from "@/app/components/HeaderNav";
import { useAuth } from "@/app/components/AuthProvider";
import styles from "./lobby.module.css";

export default function LobbyPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <img src={icon.src} alt="Hurry to the Top" width={64} height={64} />
        </Link>
        <HeaderNav />
        <p className={styles.player}>{user?.username}</p>
      </header>

      <main className={styles.lobby}>
        <h1 className={styles.title}>Lobby de partidas</h1>

        <section className={`card ${styles.panel} ${styles.search}`}>
          <h2>Buscar partida</h2>
          <img
            src={group.src}
            alt="Grupo de jugadores"
            width={300}
            height={300}
            className={`imageFx ${styles.picture}`}
          />
          <button type="button" disabled>
            Buscar
          </button>
        </section>

        <section className={`card ${styles.panel} ${styles.join}`}>
          <h2>Unirse a partida</h2>
          <form className={styles.joinForm}>
            <label htmlFor="codigo-partida">Código de partida</label>
            <input
              type="text"
              id="codigo-partida"
              name="codigo-partida"
              required
              disabled
            />
            <button type="button" disabled>
              Unirse
            </button>
          </form>
        </section>

        <section className={`card ${styles.panel} ${styles.create}`}>
          <h2>Crear partida</h2>
          <img
            src={icon.src}
            alt="Logo de Hurry to the Top"
            width={180}
            height={180}
            className={`imageFx ${styles.picture}`}
          />
          <button type="button" onClick={() => router.push("/ingame")}>
            Crear
          </button>
        </section>
      </main>

      <footer className={styles.tabBar}>
        <nav aria-label="Navegación del lobby">
          <ul className={styles.tabs}>
            <li>
              <Link
                href="/lobby"
                className={`${styles.tab} ${styles.iconMatch}`}
              >
                Partida
              </Link>
            </li>
            <li>
              <Link href="/" className={`${styles.tab} ${styles.iconHome}`}>
                Inicio
              </Link>
            </li>
            <li className={`${styles.tab} ${styles.iconInbox}`}>Buzón</li>
          </ul>
        </nav>
      </footer>
    </>
  );
}
