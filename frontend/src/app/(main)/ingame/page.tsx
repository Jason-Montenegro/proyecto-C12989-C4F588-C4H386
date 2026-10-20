import Link from "next/link";

export default function InGamePage() {
  return (
    <main>
      <h1>Partida en curso</h1>

      <section aria-labelledby="circuito">
        <h2 id="circuito">Circuito de obstáculos</h2>
        <canvas width={540} height={960}>
          <p>
            Tu navegador no soporta el elemento canvas, necesario para mostrar
            el circuito, los obstáculos y los demás jugadores. Actualiza tu
            navegador o usa uno compatible para jugar Hurry to the Top.
          </p>
        </canvas>
      </section>

      <aside aria-labelledby="hud">
        <h2 id="hud">Estado de la partida</h2>

        <section aria-labelledby="hud-jugador">
          <h3 id="hud-jugador">Tu carrera</h3>
          <dl>
            <dt>Jugador</dt>
            <dd>RaulG</dd>
            <dt>Tiempo</dt>
            <dd>
              <time dateTime="PT1M23.45S">01:23.45</time>
            </dd>
            <dt>Vidas</dt>
            <dd>2 de 3</dd>
            <dt>Penalización acumulada</dt>
            <dd>
              <time dateTime="PT5S">+00:05.00</time>
            </dd>
            <dt>Efecto activo</dt>
            <dd>Impulso de velocidad (2 s)</dd>
            <dt>Posición</dt>
            <dd>2 de 4</dd>
          </dl>
        </section>

        <section aria-labelledby="hud-posiciones">
          <h3 id="hud-posiciones">Tabla de posiciones</h3>
          <table>
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
                <td>En carrera</td>
              </tr>
              <tr>
                <td>2</td>
                <td>RaulG</td>
                <td>En carrera</td>
              </tr>
              <tr>
                <td>3</td>
                <td>CelsoG</td>
                <td>Reapareciendo</td>
              </tr>
              <tr>
                <td>4</td>
                <td>RodrigoC</td>
                <td>En carrera</td>
              </tr>
            </tbody>
          </table>
        </section>
      </aside>

      <nav aria-label="Opciones de partida">
        <ul>
          <li>
            <Link href="/results">Ver resultados</Link>
          </li>
          <li>
            <Link href="/">Abandonar partida</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
