import Link from "next/link";
import Script from "next/script";
import PistaJuego from "./PistaJuego";
import styles from "./ingame.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function InGamePage() {
  return (
    <main className={styles.ingame}>
      <h1 className={styles.title}>Partida en curso</h1>

      <section aria-labelledby="circuito" className={styles.trackArea}>
        <h2 id="circuito" className={styles.sectionTitle}>
          Circuito de obstáculos
        </h2>
        <div className={styles.trackFrame}>
          <PistaJuego className={styles.track} />

          <div id="overlay-inicio" className={styles.overlay}>
            <p className={styles.overlayText}>
              Haz clic o toca la pista para moverte
            </p>
            <button type="button" id="boton-iniciar">
              Iniciar carrera
            </button>
          </div>
          <p
            id="overlay-cuenta"
            className={`${styles.overlay} ${styles.countdown}`}
            hidden
          ></p>
          <p
            id="mensaje-juego"
            className={styles.message}
            role="status"
            aria-live="polite"
          ></p>
        </div>
      </section>

      <aside aria-labelledby="hud" className={`card ${styles.hud}`}>
        <h2 id="hud" className={styles.sectionTitle}>
          Estado de la partida
        </h2>

        <section aria-labelledby="hud-carrera">
          <h3 id="hud-carrera">Tu carrera</h3>
          <dl className={styles.stats}>
            <dt>Jugador</dt>
            <dd id="hud-jugador">—</dd>
            <dt>Tiempo</dt>
            <dd id="hud-tiempo" className={styles.time}>
              00:00.00
            </dd>
            <dt>Muertes</dt>
            <dd id="hud-muertes" className={styles.lives}>
              0
            </dd>
            <dt>Penalización acumulada</dt>
            <dd id="hud-penalizacion" className={styles.penalty}>
              +00:00.00
            </dd>
            <dt>Efecto activo</dt>
            <dd id="hud-efecto">Ninguno</dd>
            <dt>Posición</dt>
            <dd id="hud-posicion">—</dd>
            <dt>Progreso</dt>
            <dd>
              <progress
                id="hud-progreso"
                max={1}
                value={0}
                aria-label="Progreso hacia la meta"
              ></progress>
            </dd>
          </dl>
        </section>

        <section aria-labelledby="hud-posiciones">
          <h3 id="hud-posiciones">Tabla de posiciones</h3>
          <table className={`compactTable ${styles.standings}`}>
            <caption>Posiciones en tiempo real de la sala</caption>
            <thead>
              <tr>
                <th scope="col">Posición</th>
                <th scope="col">Jugador</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>
            <tbody id="tabla-posiciones"></tbody>
          </table>
        </section>
      </aside>

      <nav aria-label="Opciones de partida" className={styles.options}>
        <ul>
          <li>
            <Link href="/lobby" className="button buttonSecondary">
              Abandonar partida
            </Link>
          </li>
        </ul>
      </nav>

      <dialog id="dialogo-final" aria-labelledby="final-titulo">
        <h2 id="final-titulo">Carrera terminada</h2>
        <p>
          Ganador: <strong id="final-ganador"></strong>
        </p>
        <p>
          Tu tiempo: <span id="final-tiempo"></span>
        </p>
        <table className="compactTable">
          <caption>Posiciones finales</caption>
          <thead>
            <tr>
              <th scope="col">Posición</th>
              <th scope="col">Jugador</th>
              <th scope="col">Tiempo</th>
            </tr>
          </thead>
          <tbody id="tabla-final"></tbody>
        </table>
        <ul className={styles.dialogActions}>
          <li>
            <button type="button" id="boton-reiniciar">
              Jugar de nuevo
            </button>
          </li>
          <li>
            <Link
              href="/lobby"
              id="boton-abandonar"
              className="button buttonSecondary"
            >
              Salir al lobby
            </Link>
          </li>
        </ul>
      </dialog>

      <Script
        type="module"
        src={`${basePath}/game/main.js`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </main>
  );
}
