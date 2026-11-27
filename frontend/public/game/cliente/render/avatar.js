import { RADIO_JUGADOR } from "../../constantes.js";
import { dibujarSprite } from "./sprites.js";

/** @typedef {import("../../tipos.js").Jugador} Jugador */
/** @typedef {import("../../tipos.js").Vector2} Vector2 */

const COLOR_RESPALDO_AVATAR = "#4f8cff";

/**
 * Dibuja el sprite del jugador centrado en un punto del canvas.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Jugador} jugador Jugador a dibujar.
 * @param {Vector2} centro Centro en coordenadas del canvas.
 * @returns {void}
 */
export function dibujarAvatar(contexto, jugador, centro) {
  const lado = RADIO_JUGADOR * 2;
  const rect = {
    x: centro.x - RADIO_JUGADOR,
    y: centro.y - RADIO_JUGADOR,
    ancho: lado,
    alto: lado,
  };
  dibujarSprite(contexto, jugador.sprite, rect, COLOR_RESPALDO_AVATAR);
}
