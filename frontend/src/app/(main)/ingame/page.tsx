import Link from "next/link";
import styles from "./ingame.module.css";

export default function InGamePage() {
  return (
    <main className={styles.ingame}>
      <h1 className={styles.title}>Partida en curso</h1>

      <section aria-labelledby="circuito" className={styles.trackArea}>
        <h2 id="circuito" className={styles.sectionTitle}>
          Circuito de obstáculos
        </h2>
        <canvas width={540} height={960} className={styles.track}>
          <p>
            Tu navegador no soporta el elemento canvas, necesario para mostrar
            el circuito, los obstáculos y los demás jugadores. Actualiza tu
            navegador o usa uno compatible para jugar Hurry to the Top.
          </p>
        </canvas>
      </section>

      <aside aria-labelledby="hud" className={`card ${styles.hud}`}>
        <h2 id="hud" className={styles.sectionTitle}>
          Estado de la partida
        </h2>

        <section aria-labelledby="hud-jugador">
          <h3 id="hud-jugador">Tu carrera</h3>
          <dl className={styles.stats}>
            <dt>Jugador</dt>
            <dd>RaulG</dd>
            <dt>Tiempo</dt>
            <dd className={styles.time}>
              <time dateTime="PT1M23.45S">01:23.45</time>
            </dd>
            <dt>Vidas</dt>
            <dd className={styles.lives}>2 de 3</dd>
            <dt>Penalización acumulada</dt>
            <dd className={styles.penalty}>
              <time dateTime="PT5S">+00:05.00</time>
            </dd>
            <dt>Efecto activo</dt>
            <dd>
              <span className={styles.boost}>Impulso de velocidad (2 s)</span>
            </dd>
            <dt>Posición</dt>
            <dd>2 de 4</dd>
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
            <tbody>
              <tr>
                <td>1</td>
                <td>LauraF</td>
                <td className={styles.racing}>En carrera</td>
              </tr>
              <tr className={styles.currentPlayer}>
                <td>2</td>
                <td>RaulG</td>
                <td className={styles.racing}>En carrera</td>
              </tr>
              <tr>
                <td>3</td>
                <td>CelsoG</td>
                <td className={styles.respawning}>Reapareciendo</td>
              </tr>
              <tr>
                <td>4</td>
                <td>RodrigoC</td>
                <td className={styles.racing}>En carrera</td>
              </tr>
            </tbody>
          </table>
        </section>
      </aside>

      <nav aria-label="Opciones de partida" className={styles.options}>
        <ul>
          <li>
            <Link href="/results" className="button">
              Ver resultados
            </Link>
          </li>
          <li>
            <Link href="/" className="button buttonSecondary">
              Abandonar partida
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
