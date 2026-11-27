import {
  MULTIPLICADOR_ATURDIDO,
  MULTIPLICADOR_IMPULSO,
  MULTIPLICADOR_LENTO,
  VELOCIDAD_BASE,
} from "../constantes.js";
import { mantenerEnPista } from "./geometria.js";

/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Obstaculo} Obstaculo */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/** Sin desplazamiento: el jugador no se movió en este paso. */
const QUIETO = Object.freeze({ x: 0, y: 0 });

/**
 * Velocidad efectiva del jugador: base × impulso × terreno lento ×
 * aturdimiento.
 * @param {Jugador} jugador Jugador a revisar.
 * @returns {number} Unidades por segundo.
 */
export function calcularVelocidad(jugador) {
  const impulso = jugador.impulsoMs > 0 ? MULTIPLICADOR_IMPULSO : 1;
  const lento = jugador.enTerrenoLento ? MULTIPLICADOR_LENTO : 1;
  const aturdido = jugador.aturdidoMs > 0 ? MULTIPLICADOR_ATURDIDO : 1;
  return VELOCIDAD_BASE * impulso * lento * aturdido;
}

/**
 * Acerca al jugador a su destino. Al llegar, borra el destino.
 * @param {Jugador} jugador Jugador a mover (se modifica).
 * @param {number} dtMs Tiempo del paso.
 * @returns {Vector2} Desplazamiento aplicado, para saber hacia dónde iba.
 */
export function moverJugador(jugador, dtMs) {
  if (!jugador.destino) {
    return QUIETO;
  }
  const origen = { x: jugador.x, y: jugador.y };
  const dx = jugador.destino.x - jugador.x;
  const dy = jugador.destino.y - jugador.y;
  const restante = Math.hypot(dx, dy);
  const paso = (calcularVelocidad(jugador) * dtMs) / 1000;
  if (restante <= paso) {
    jugador.x = jugador.destino.x;
    jugador.y = jugador.destino.y;
    jugador.destino = null;
  } else {
    jugador.x += (dx / restante) * paso;
    jugador.y += (dy / restante) * paso;
  }
  mantenerEnPista(jugador);
  return { x: jugador.x - origen.x, y: jugador.y - origen.y };
}

/**
 * Ubica cada obstáculo móvil según el tiempo de carrera.
 * @param {Obstaculo[]} obstaculos Obstáculos del mapa (se modifican).
 * @param {number} tiempoMs Tiempo de carrera.
 * @returns {void}
 */
export function moverObstaculos(obstaculos, tiempoMs) {
  obstaculos.forEach((obstaculo) => ubicarObstaculo(obstaculo, tiempoMs));
}

/**
 * Coloca un obstáculo móvil en su punto del vaivén:
 * `origen + amplitud * sin(2π * tiempoMs / periodoMs)`.
 * @param {Obstaculo} obstaculo Obstáculo a ubicar (se modifica).
 * @param {number} tiempoMs Tiempo de carrera.
 * @returns {void}
 */
function ubicarObstaculo(obstaculo, tiempoMs) {
  const { movimiento, origen } = obstaculo;
  if (!movimiento) {
    return;
  }
  const fase = (2 * Math.PI * tiempoMs) / movimiento.periodoMs;
  const desfase = movimiento.amplitud * Math.sin(fase);
  if (movimiento.eje === "x") {
    obstaculo.x = origen.x + desfase;
  } else {
    obstaculo.y = origen.y + desfase;
  }
}
