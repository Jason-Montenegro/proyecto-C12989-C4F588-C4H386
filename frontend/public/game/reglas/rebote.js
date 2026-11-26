import { RADIO_JUGADOR } from "../constantes.js";
import { mantenerEnPista } from "./geometria.js";

/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Vector2} Vector2 */
/** @typedef {import("./geometria.js").Rectangulo} Rectangulo */

/**
 * Una forma de sacar al jugador de un rectángulo.
 * @typedef {object} Salida
 * @property {Vector2} direccion Vector unitario sobre un eje.
 * @property {number} distancia Lo mínimo que hay que moverse para salir.
 */

/** Dirección de respaldo cuando no se sabe hacia dónde iba el jugador. */
const HACIA_LA_SALIDA = Object.freeze({ x: 0, y: -1 });

/**
 * Saca al jugador de un obstáculo por el camino más corto en sentido
 * contrario al que venía y lo empuja `distanciaExtra` más. Si iba hacia
 * arriba a la derecha, sale hacia abajo o hacia la izquierda, lo que esté
 * más cerca. Si estaba quieto (lo empujó un obstáculo móvil), sale por el
 * lado más cercano.
 * @param {Jugador} jugador Jugador que chocó (se modifica).
 * @param {Rectangulo} rect Obstáculo con el que chocó.
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @param {number} distanciaExtra Empuje adicional después de salir.
 * @returns {void}
 */
export function rebotarContraRectangulo(
  jugador,
  rect,
  desplazamiento,
  distanciaExtra,
) {
  const salidas = calcularSalidas(jugador, rect);
  const contrarias = salidas.filter(
    (salida) => producto(salida.direccion, desplazamiento) < 0,
  );
  const salida = elegirMasCorta(contrarias.length > 0 ? contrarias : salidas);
  const empuje = salida.distancia + distanciaExtra;
  jugador.x += salida.direccion.x * empuje;
  jugador.y += salida.direccion.y * empuje;
  detener(jugador);
}

/**
 * Separa al jugador de otro jugador a lo largo de la línea que une sus
 * centros, que es el camino más corto para dejar de tocarse.
 * @param {Jugador} jugador Jugador que chocó (se modifica).
 * @param {Jugador} otro Jugador con el que chocó (no se modifica).
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @param {number} distanciaExtra Empuje adicional después de separarse.
 * @returns {void}
 */
export function rebotarContraJugador(
  jugador,
  otro,
  desplazamiento,
  distanciaExtra,
) {
  const direccion = calcularDireccionSeparacion(jugador, otro, desplazamiento);
  const separacion = RADIO_JUGADOR * 2 + distanciaExtra;
  jugador.x = otro.x + direccion.x * separacion;
  jugador.y = otro.y + direccion.y * separacion;
  detener(jugador);
}

/**
 * Las cuatro salidas posibles de un círculo dentro de un rectángulo.
 * @param {Vector2} centro Centro del jugador.
 * @param {Rectangulo} rect Obstáculo.
 * @returns {Salida[]} Salidas por izquierda, derecha, abajo y arriba.
 */
function calcularSalidas(centro, rect) {
  return [
    {
      direccion: { x: -1, y: 0 },
      distancia: centro.x + RADIO_JUGADOR - rect.x,
    },
    {
      direccion: { x: 1, y: 0 },
      distancia: rect.x + rect.ancho - (centro.x - RADIO_JUGADOR),
    },
    {
      direccion: { x: 0, y: -1 },
      distancia: centro.y + RADIO_JUGADOR - rect.y,
    },
    {
      direccion: { x: 0, y: 1 },
      distancia: rect.y + rect.alto - (centro.y - RADIO_JUGADOR),
    },
  ];
}

/**
 * Elige la salida que requiere moverse menos.
 * @param {Salida[]} salidas Salidas candidatas (al menos una).
 * @returns {Salida} La más corta.
 */
function elegirMasCorta(salidas) {
  return salidas.reduce((mejor, salida) =>
    salida.distancia < mejor.distancia ? salida : mejor,
  );
}

/**
 * Vector unitario que va del otro jugador hacia este. Si los centros
 * coinciden, usa el sentido contrario al que venía.
 * @param {Vector2} jugador Centro del jugador que rebota.
 * @param {Vector2} otro Centro del otro jugador.
 * @param {Vector2} desplazamiento Movimiento del jugador en este paso.
 * @returns {Vector2} Dirección de separación.
 */
function calcularDireccionSeparacion(jugador, otro, desplazamiento) {
  const entreCentros = { x: jugador.x - otro.x, y: jugador.y - otro.y };
  const contraria = { x: -desplazamiento.x, y: -desplazamiento.y };
  return normalizar(entreCentros) ?? normalizar(contraria) ?? HACIA_LA_SALIDA;
}

/**
 * Convierte un vector en unitario.
 * @param {Vector2} vector Vector a normalizar.
 * @returns {Vector2|null} Vector unitario, o `null` si mide 0.
 */
function normalizar(vector) {
  const largo = Math.hypot(vector.x, vector.y);
  return largo > 0 ? { x: vector.x / largo, y: vector.y / largo } : null;
}

/**
 * Producto punto: negativo si los vectores apuntan en sentidos opuestos.
 * @param {Vector2} vector Primer vector.
 * @param {Vector2} otro Segundo vector.
 * @returns {number} Producto punto.
 */
function producto(vector, otro) {
  return vector.x * otro.x + vector.y * otro.y;
}

/**
 * Tras un rebote el jugador se detiene y debe elegir un destino nuevo.
 * También lo devuelve a la pista si el rebote lo sacó por un costado.
 * @param {Jugador} jugador Jugador que rebotó (se modifica).
 * @returns {void}
 */
function detener(jugador) {
  jugador.destino = null;
  mantenerEnPista(jugador);
}
