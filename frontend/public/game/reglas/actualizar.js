import { avanzarCamara, revisarBordeInferior } from "./camara.js";
import { resolverColisiones } from "./colisiones.js";
import { actualizarEfectos } from "./efectos.js";
import { actualizarFases } from "./fases.js";
import { avanzarReaparicion, revisarObstaculosMortales } from "./muerte.js";
import { moverJugador, moverObstaculos } from "./movimiento.js";
import { actualizarProgreso, revisarMeta } from "./puntaje.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */

/**
 * Avanza la simulación `dtMs` milisegundos. Modifica `estado` en el sitio.
 *
 * Orden de un paso de carrera:
 * 1. fases y reloj;
 * 2. obstáculos móviles y cámara;
 * 3. cada jugador: moverse, chocar, efectos, obstáculos mortales y borde;
 * 4. meta y progreso.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {number} dtMs Tiempo transcurrido desde el cuadro anterior.
 * @returns {EventoJuego[]} Eventos ocurridos durante el paso.
 */
export function actualizarEstado(estado, dtMs) {
  const eventos = actualizarFases(estado, dtMs);
  if (estado.fase !== "enCarrera") {
    return eventos;
  }
  moverObstaculos(estado.mapa.obstaculos, estado.tiempoMs);
  avanzarCamara(estado, dtMs);
  estado.jugadores.forEach((jugador) =>
    eventos.push(...simularJugador(estado, jugador, dtMs)),
  );
  eventos.push(...revisarMeta(estado));
  actualizarProgreso(estado);
  return eventos;
}

/**
 * Simula a un jugador durante un paso según su estado.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador a simular (se modifica).
 * @param {number} dtMs Tiempo del paso.
 * @returns {EventoJuego[]} Eventos del jugador.
 */
function simularJugador(estado, jugador, dtMs) {
  if (jugador.estado === "muerto") {
    return avanzarReaparicion(estado, jugador, dtMs);
  }
  if (jugador.estado !== "corriendo") {
    return [];
  }
  const desplazamiento = moverJugador(jugador, dtMs);
  return [
    ...resolverColisiones(estado, jugador, desplazamiento),
    ...actualizarEfectos(jugador, estado.mapa.zonas, dtMs),
    ...revisarObstaculosMortales(estado, jugador),
    ...revisarBordeInferior(estado, jugador),
  ];
}
