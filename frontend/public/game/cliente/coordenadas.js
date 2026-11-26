import { ALTO_VISTA } from "../constantes.js";

/** @typedef {import("../tipos.js").Camara} Camara */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/**
 * Rectángulo en coordenadas lógicas del canvas (origen arriba a la izquierda).
 * @typedef {object} RectPantalla
 * @property {number} x
 * @property {number} y
 * @property {number} ancho
 * @property {number} alto
 */

/**
 * Rectángulo del mundo ubicado por su esquina inferior izquierda.
 * @typedef {{x: number, y: number, ancho: number, alto: number}} RectMundo
 */

/**
 * Convierte una altura del mundo a la coordenada y del canvas.
 * En el mundo la y crece hacia la meta; en el canvas crece hacia abajo.
 * @param {number} altura Altura en el mundo.
 * @param {Camara} camara Cámara de la partida.
 * @returns {number} Coordenada y lógica del canvas.
 */
export function alturaAPantalla(altura, camara) {
  return ALTO_VISTA - (altura - camara.y);
}

/**
 * Convierte un punto lógico del canvas a coordenadas del mundo.
 * @param {Vector2} punto Punto en coordenadas lógicas del canvas.
 * @param {Camara} camara Cámara de la partida.
 * @returns {Vector2} Punto del mundo.
 */
export function pantallaAMundo(punto, camara) {
  return { x: punto.x, y: camara.y + ALTO_VISTA - punto.y };
}

/**
 * Convierte un rectángulo del mundo a un rectángulo del canvas.
 * @param {RectMundo} rect Rectángulo del mundo.
 * @param {Camara} camara Cámara de la partida.
 * @returns {RectPantalla} Rectángulo listo para dibujar.
 */
export function rectAPantalla(rect, camara) {
  return {
    x: rect.x,
    y: alturaAPantalla(rect.y + rect.alto, camara),
    ancho: rect.ancho,
    alto: rect.alto,
  };
}

/**
 * Indica si alguna parte de un rectángulo del mundo cae dentro de la vista.
 * @param {RectMundo} rect Rectángulo del mundo.
 * @param {Camara} camara Cámara de la partida.
 * @returns {boolean} `true` si hay que dibujarlo.
 */
export function estaEnVista(rect, camara) {
  return rect.y + rect.alto >= camara.y && rect.y <= camara.y + ALTO_VISTA;
}
