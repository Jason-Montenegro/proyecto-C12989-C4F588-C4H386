import {
  DISTANCIA_REBOTE,
  MULTIPLICADOR_REBOTADOR,
  RADIO_JUGADOR,
} from "../constantes.js";
import { circuloTocaRectangulo, distancia } from "./geometria.js";
import { rebotarContraJugador, rebotarContraRectangulo } from "./rebote.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Obstaculo} Obstaculo */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/** Obstáculos que hacen rebotar; los demás tipos matan. */
const TIPOS_SOLIDOS = new Set(["muro", "caja", "rebotador"]);

/**
 * Hace rebotar al jugador si choca con un obstáculo sólido o con otro
 * jugador en carrera.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador que acaba de moverse (se modifica).
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @returns {EventoJuego[]} Un evento "colision" por cada choque.
 */
export function resolverColisiones(estado, jugador, desplazamiento) {
  return [
    ...chocarConObstaculos(estado.mapa.obstaculos, jugador, desplazamiento),
    ...chocarConJugadores(estado.jugadores, jugador, desplazamiento),
  ];
}

/**
 * Revisa el primer obstáculo sólido que toca el jugador.
 * @param {Obstaculo[]} obstaculos Obstáculos del mapa.
 * @param {Jugador} jugador Jugador que se movió (se modifica).
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @returns {EventoJuego[]} Evento "colision" si chocó.
 */
function chocarConObstaculos(obstaculos, jugador, desplazamiento) {
  const obstaculo = obstaculos.find(
    (actual) =>
      TIPOS_SOLIDOS.has(actual.tipo) &&
      circuloTocaRectangulo(jugador, RADIO_JUGADOR, actual),
  );
  if (!obstaculo) {
    return [];
  }
  rebotarContraRectangulo(
    jugador,
    obstaculo,
    desplazamiento,
    calcularEmpuje(obstaculo),
  );
  return [{ tipo: "colision", jugadorId: jugador.id }];
}

/**
 * Revisa el primer jugador en carrera que toca al jugador.
 * @param {Jugador[]} jugadores Todos los jugadores.
 * @param {Jugador} jugador Jugador que se movió (se modifica).
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @returns {EventoJuego[]} Evento "colision" si chocó.
 */
function chocarConJugadores(jugadores, jugador, desplazamiento) {
  const otro = jugadores.find(
    (actual) =>
      actual !== jugador &&
      actual.estado === "corriendo" &&
      distancia(actual, jugador) < RADIO_JUGADOR * 2,
  );
  if (!otro) {
    return [];
  }
  rebotarContraJugador(jugador, otro, desplazamiento, DISTANCIA_REBOTE);
  return [{ tipo: "colision", jugadorId: jugador.id }];
}

/**
 * Cuánto empuja cada obstáculo después del choque.
 * @param {Obstaculo} obstaculo Obstáculo sólido.
 * @returns {number} Distancia de rebote.
 */
function calcularEmpuje(obstaculo) {
  return obstaculo.tipo === "rebotador"
    ? DISTANCIA_REBOTE * MULTIPLICADOR_REBOTADOR
    : DISTANCIA_REBOTE;
}
