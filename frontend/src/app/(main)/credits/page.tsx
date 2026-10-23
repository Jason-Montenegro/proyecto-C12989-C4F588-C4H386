import Link from "next/link";

export default function CreditsPage() {
  return (
    <main>
      <article>
        <h1>Créditos</h1>

        <section>
          <h2>Equipo de desarrollo</h2>
          <ul>
            <li>Jason Montenegro Navarro</li>
            <li>Juan González Márquez</li>
            <li>Raúl Gadea Alfaro</li>
          </ul>
        </section>

        <section>
          <h2>Imágenes y recursos externos</h2>
          <ul>
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

        <section>
          <h2>Recursos del proyecto</h2>
          <p>
            El logotipo del juego y el favicon forman parte de los recursos
            compartidos por el equipo en el repositorio.
          </p>
        </section>

        <p>
          <Link href="https://github.com/Jason-Montenegro/proyecto-C12989-C4F588-C4H386">
            Repositorio del proyecto
          </Link>
        </p>
      </article>
    </main>
  );
}
