import Link from "next/link";
import Image from "next/image";
import ganador from "@/../public/assets/jugador_azul.png";

export default function ResultsPage() {
  return (
    <main>
      <h1>Resultados de carrera</h1>

      <dialog open aria-labelledby="ganador">
        <Image src={ganador} width={64} height={64} alt="Avatar de RodrigoC" />
        <h2 id="ganador">¡Llegaste de 1er lugar!</h2>
        <p>
          Tiempo: <time dateTime="PT45.38S">00:45:38</time>
        </p>
      </dialog>

      <section aria-labelledby="clasificacion">
        <h2 id="clasificacion">Clasificación</h2>
        <table>
          <caption>Posiciones finales de la sala</caption>
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
              <td>RodrigoC</td>
              <td>Terminó</td>
            </tr>
            <tr>
              <td>2</td>
              <td>LauraF</td>
              <td>Terminó</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CelsoG</td>
              <td>En carrera</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Milei</td>
              <td>En carrera</td>
            </tr>
          </tbody>
        </table>
      </section>

      <nav aria-label="Opciones después de la carrera">
        <ul>
          <li>
            <Link href="/ingame">Jugar de nuevo</Link>
          </li>
          <li>
            <Link href="/lobby">Salir al lobby</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
