/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("./hud.js").ElementosHud} ElementosHud */

/*
 * STUB PROVISIONAL (dueño: interfaz).
 * Solo oculta el overlay de inicio cuando la partida sale de "esperando".
 * Interfaz debe añadir la cuenta regresiva y el diálogo final.
 */

/**
 * Muestra u oculta los overlays según la fase. Solo lee el estado.
 * @param {ElementosHud} elementos Elementos de la interfaz.
 * @param {EstadoJuego} estado Estado de la partida.
 * @returns {void}
 */
export function renderizarOverlays(elementos, estado) {
  elementos.overlayInicio.hidden = estado.fase !== "esperando";
}
