import { RADIO_JUGADOR } from "../../constantes.js";
import { alturaAPantalla } from "../coordenadas.js";
import { dibujarAvatar } from "./avatar.js";
import {
  dibujarAturdimiento,
  dibujarEstela,
  dibujarFantasmaReaparicion,
  dibujarMarcaLocal,
  dibujarTinteLento,
} from "./efectosJugador.js";

/** @typedef {import("../../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../../tipos.js").Jugador} Jugador */
/** @typedef {import("../../tipos.js").Vector2} Vector2 */
/** @typedef {import("./paleta.js").Paleta} Paleta */

const OPACIDAD_TERMINADO = 0.5;
const OPACIDAD_ATURDIDO = 0.35;
const PARPADEO_ATURDIDO_MS = 120;
const SEPARACION_NOMBRE = 8;

/**
 * Dibuja a todos los jugadores; el local va al final para quedar encima.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {EstadoJuego} estado Estado de la partida (solo lectura).
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarJugadores(contexto, estado, paleta) {
  const esLocal = (/** @type {Jugador} */ jugador) =>
    jugador.id === estado.jugadorLocalId;
  [
    ...estado.jugadores.filter((jugador) => !esLocal(jugador)),
    ...estado.jugadores.filter(esLocal),
  ].forEach((jugador) => dibujarJugador(contexto, jugador, estado, paleta));
}

/**
 * Dibuja un jugador con los efectos que indica su estado.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Jugador} jugador Jugador a dibujar.
 * @param {EstadoJuego} estado Estado de la partida (solo lectura).
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarJugador(contexto, jugador, estado, paleta) {
  if (jugador.estado === "muerto") {
    dibujarFantasmaReaparicion(contexto, jugador, paleta);
    return;
  }
  const centro = { x: jugador.x, y: alturaAPantalla(jugador.y, estado.camara) };
  const esLocal = jugador.id === estado.jugadorLocalId;
  contexto.save();
  contexto.globalAlpha = calcularOpacidad(jugador);
  if (jugador.impulsoMs > 0) {
    dibujarEstela(contexto, jugador, estado.camara, paleta);
  }
  dibujarAvatar(contexto, jugador, centro);
  if (jugador.enTerrenoLento) {
    dibujarTinteLento(contexto, centro);
  }
  if (jugador.aturdidoMs > 0) {
    dibujarAturdimiento(contexto, centro, jugador.aturdidoMs, paleta);
  }
  if (esLocal) {
    dibujarMarcaLocal(contexto, jugador, estado.camara, paleta);
  }
  dibujarNombre(contexto, jugador.nombre, centro, paleta);
  contexto.restore();
}

/**
 * Opacidad del jugador: tenue si ya terminó y parpadeante mientras está
 * aturdido tras reaparecer.
 * @param {Jugador} jugador Jugador a dibujar.
 * @returns {number} Opacidad entre 0 y 1.
 */
function calcularOpacidad(jugador) {
  if (jugador.estado === "terminado") {
    return OPACIDAD_TERMINADO;
  }
  const apagado = Math.floor(jugador.aturdidoMs / PARPADEO_ATURDIDO_MS) % 2;
  return jugador.aturdidoMs > 0 && apagado === 1 ? OPACIDAD_ATURDIDO : 1;
}

/**
 * Escribe el nombre del jugador sobre su avatar.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {string} nombre Nombre a mostrar.
 * @param {Vector2} centro Centro del avatar en el canvas.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarNombre(contexto, nombre, centro, paleta) {
  const y = centro.y - RADIO_JUGADOR - SEPARACION_NOMBRE;
  contexto.font = "bold 13px system-ui, sans-serif";
  contexto.textAlign = "center";
  contexto.lineWidth = 3;
  contexto.strokeStyle = paleta.fondo;
  contexto.strokeText(nombre, centro.x, y);
  contexto.fillStyle = paleta.texto;
  contexto.fillText(nombre, centro.x, y);
}
