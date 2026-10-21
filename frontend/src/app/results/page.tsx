import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
      <h1>Resultados de carrera</h1>

      <section>
        <h2>¡Llegaste en primer lugar!</h2>
        <p>
          <strong>Tiempo:</strong> 00:45:38
        </p>
        <p>Resultados de ejemplo para esta entrega.</p>
      </section>

      <section>
        <h2>Clasificación</h2>
        <table>
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
            <Link href="/play">Jugar de nuevo</Link>
          </li>
          <li>
            <Link href="/lobby">Salir al lobby</Link>
          </li>
          <li>
            <Link href="/">Inicio</Link>
          </li>
        </ul>
      </nav>
      </main>
      <Footer />
    </>
  );
}
