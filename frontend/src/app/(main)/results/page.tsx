import Link from "next/link";
import Image from "next/image";
import ganador from "@/../public/assets/jugador_azul.png";
import styles from "./results.module.css";

export default function ResultsPage() {
  return (
    <main className={styles.results}>
      <h1 className={styles.title}>Resultados de carrera</h1>

      <dialog open aria-labelledby="ganador" className={styles.winner}>
        <Image
          src={ganador}
          width={64}
          height={64}
          alt="Avatar de RodrigoC"
          className={styles.avatar}
        />
        <h2 id="ganador" className={styles.winnerTitle}>
          ¡Llegaste de 1er lugar!
        </h2>
        <p className={styles.winnerTime}>
          Tiempo: <time dateTime="PT45.38S">00:45:38</time>
        </p>
      </dialog>

      <section aria-labelledby="clasificacion" className="card">
        <h2 id="clasificacion" className="cardTitle">
          Clasificación
        </h2>
        <table className={`compactTable ${styles.standings}`}>
          <caption>Posiciones finales de la sala</caption>
          <thead>
            <tr>
              <th scope="col">Posición</th>
              <th scope="col">Jugador</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.first}>
              <td>1</td>
              <td>RodrigoC</td>
              <td className={styles.finished}>Terminó</td>
            </tr>
            <tr>
              <td>2</td>
              <td>LauraF</td>
              <td className={styles.finished}>Terminó</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CelsoG</td>
              <td className={styles.racing}>En carrera</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Milei</td>
              <td className={styles.racing}>En carrera</td>
            </tr>
          </tbody>
        </table>
      </section>

      <nav
        aria-label="Opciones después de la carrera"
        className={styles.options}
      >
        <ul>
          <li>
            <Link href="/ingame" className="button">
              Jugar de nuevo
            </Link>
          </li>
          <li>
            <Link href="/lobby" className="button buttonSecondary">
              Salir al lobby
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
