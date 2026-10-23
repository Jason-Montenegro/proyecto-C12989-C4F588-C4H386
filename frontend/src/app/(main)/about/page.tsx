import Link from "next/link";
import github from "@/../public/github.png";

export default function AboutPage() {
  return (
    <main>
      <article>
        <h1>Sobre nosotros</h1>

        <p>
          Somos INTERLUDIO Studios, un equipo de estudiantes que desarrolla
          Hurry to the Top como proyecto de programación web. Queremos crear
          un juego de carreras que se pueda disfrutar desde el navegador.
        </p>

        <p>
          Hurry to the Top es un juego multijugador en el que entre 2 y 10
          participantes compiten por llegar al final de un circuito. Durante
          la carrera deben esquivar obstáculos, aprovechar plataformas de
          impulso y elegir el mejor camino para alcanzar la meta.
        </p>

        <p>
          Nuestro objetivo es que los jugadores puedan competir con sus
          amigos en tiempo real, tanto desde una computadora como desde un
          dispositivo móvil. En nuestro repositorio se puede consultar el
          código y el avance del proyecto.
        </p>

        <p>
          <Link href="https://github.com/Jason-Montenegro/proyecto-C12989-C4F588-C4H386">
            <img src={github.src} alt="" width={30} height={30} />
            Repositorio
          </Link>
        </p>
      </article>
    </main>
  );
}
