import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function PlayPage() {
  return (
    <>
      <Header />
      <main>
      <h1>Hurry to the Top - Partida</h1>

      <section>
        <h2>Circuito de obstáculos</h2>
        <p>
          Los jugadores avanzan desde la salida hasta la meta y deben evitar
          las colisiones con los obstáculos del recorrido.
        </p>
        <canvas width={620} height={1200} aria-label="Circuito de juego">
          Tu navegador no admite el elemento canvas. El juego necesita un
          navegador compatible para mostrar el circuito y los jugadores.
        </canvas>
      </section>

      <aside>
        <h2>Estado de la partida</h2>
        <dl>
          <dt>Jugador</dt>
          <dd>PlayerName</dd>
          <dt>Tiempo</dt>
          <dd>00:00:00</dd>
          <dt>Posición</dt>
          <dd>1 de 4</dd>
          <dt>Jugadores</dt>
          <dd>4 de 10</dd>
          <dt>Estado</dt>
          <dd>Esperando inicio</dd>
        </dl>
        <p>Valores de ejemplo para la maqueta de la partida.</p>
      </aside>

      <nav aria-label="Opciones de partida">
        <ul>
          <li>
            <Link href="/lobby">Volver al lobby</Link>
          </li>
          <li>
            <Link href="/results">Ver resultados</Link>
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
