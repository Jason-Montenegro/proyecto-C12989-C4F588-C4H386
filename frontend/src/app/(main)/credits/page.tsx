import Link from "next/link";
import styles from "./credits.module.css";

export default function CreditsPage() {
  return (
    <main className={styles.page}>
      <article className={`card ${styles.credits}`}>
        <h1 className="cardTitle">Créditos</h1>

        <section className={styles.group}>
          <h2>Equipo de desarrollo</h2>
          <ul className={styles.list}>
            <li>Jason Montenegro Navarro</li>
            <li>Juan González Márquez</li>
            <li>Raúl Gadea Alfaro</li>
          </ul>
        </section>

        <section className={styles.group}>
          <h2>Imágenes y recursos externos</h2>
          <ul className={styles.list}>
            <li>
              Las imágenes group.png, ranking.png y speed.png se obtuvieron
              utilizando <Link href="https://www.magnific.com/">Magnific</Link>.
              Su uso está sujeto a los términos de la plataforma.
            </li>
            <li>
              El archivo github.png reproduce el logotipo de
              <Link href="https://github.com/"> GitHub</Link>.
            </li>
          </ul>
        </section>

        <section className={styles.group}>
          <h2>Recursos del proyecto</h2>
          <p>
            El logotipo del juego y el favicon forman parte de los recursos
            compartidos por el equipo en el repositorio.
          </p>
        </section>

        <p className={styles.repo}>
          <Link href="https://github.com/Jason-Montenegro/proyecto-C12989-C4F588-C4H386">
            Repositorio del proyecto
          </Link>
        </p>
      </article>
    </main>
  );
}
