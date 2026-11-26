import { ALTO_VISTA, ANCHO_MUNDO } from "../constantes.js";
import { pantallaAMundo } from "./coordenadas.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").Despachador} Despachador */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/** Botón principal del puntero: clic izquierdo, toque o lápiz. */
const BOTON_PRINCIPAL = 0;

/**
 * Convierte cada clic o toque sobre la pista en una acción "mover" del
 * jugador local. `pointerdown` cubre ratón, pantalla táctil y lápiz.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @param {() => EstadoJuego} obtenerEstado Devuelve el estado actual (solo lectura).
 * @param {Despachador} despachar Encola la acción para el siguiente cuadro.
 * @returns {void}
 */
export function registrarEntrada(canvas, obtenerEstado, despachar) {
  canvas.addEventListener("pointerdown", (evento) => {
    if (evento.button !== BOTON_PRINCIPAL) {
      return;
    }
    evento.preventDefault();
    const estado = obtenerEstado();
    despachar({
      tipo: "mover",
      jugadorId: estado.jugadorLocalId,
      destino: pantallaAMundo(leerPuntoLogico(canvas, evento), estado.camara),
    });
  });
}

/**
 * Traduce la posición del puntero a coordenadas lógicas del canvas,
 * sin importar el tamaño con que el CSS lo muestre ni su borde.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @param {PointerEvent} evento Evento del puntero.
 * @returns {Vector2} Punto lógico dentro de 0..ANCHO_MUNDO y 0..ALTO_VISTA.
 */
function leerPuntoLogico(canvas, evento) {
  const caja = canvas.getBoundingClientRect();
  const enX = evento.clientX - caja.left - canvas.clientLeft;
  const enY = evento.clientY - caja.top - canvas.clientTop;
  return {
    x: (enX * ANCHO_MUNDO) / canvas.clientWidth,
    y: (enY * ALTO_VISTA) / canvas.clientHeight,
  };
}
