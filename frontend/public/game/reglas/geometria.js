import { ANCHO_MUNDO, RADIO_JUGADOR } from "../constantes.js";

/** @typedef {import("../tipos.js").Vector2} Vector2 */

/**
 * Rectángulo del mundo ubicado por su esquina inferior izquierda.
 * @typedef {{x: number, y: number, ancho: number, alto: number}} Rectangulo
 */

/**
 * Acota un valor a un rango.
 * @param {number} valor Valor a acotar.
 * @param {number} minimo Límite inferior.
 * @param {number} maximo Límite superior.
 * @returns {number} Valor dentro de `[minimo, maximo]`.
 */
export function limitar(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

/**
 * Distancia entre dos puntos.
 * @param {Vector2} punto Primer punto.
 * @param {Vector2} otro Segundo punto.
 * @returns {number} Distancia euclidiana.
 */
export function distancia(punto, otro) {
  return Math.hypot(punto.x - otro.x, punto.y - otro.y);
}

/**
 * Centro de un rectángulo.
 * @param {Rectangulo} rect Rectángulo del mundo.
 * @returns {Vector2} Punto central.
 */
export function centroDe(rect) {
  return { x: rect.x + rect.ancho / 2, y: rect.y + rect.alto / 2 };
}

/**
 * Indica si un punto cae dentro de un rectángulo.
 * @param {Rectangulo} rect Rectángulo del mundo.
 * @param {Vector2} punto Punto a revisar.
 * @returns {boolean} `true` si está dentro o en el borde.
 */
export function contienePunto(rect, punto) {
  return (
    punto.x >= rect.x &&
    punto.x <= rect.x + rect.ancho &&
    punto.y >= rect.y &&
    punto.y <= rect.y + rect.alto
  );
}

/**
 * Indica si un círculo se superpone con un rectángulo.
 * @param {Vector2} centro Centro del círculo.
 * @param {number} radio Radio del círculo.
 * @param {Rectangulo} rect Rectángulo del mundo.
 * @returns {boolean} `true` si se tocan.
 */
export function circuloTocaRectangulo(centro, radio, rect) {
  const cercano = {
    x: limitar(centro.x, rect.x, rect.x + rect.ancho),
    y: limitar(centro.y, rect.y, rect.y + rect.alto),
  };
  return distancia(centro, cercano) < radio;
}

/**
 * Mantiene al jugador entre los bordillos laterales de la pista.
 * @param {Vector2} jugador Jugador (se modifica su `x`).
 * @returns {void}
 */
export function mantenerEnPista(jugador) {
  jugador.x = limitar(jugador.x, RADIO_JUGADOR, ANCHO_MUNDO - RADIO_JUGADOR);
}
