/* eslint-disable @typescript-eslint/no-unused-vars -- stub: los parámetros
   de renderizarHud son parte del contrato; quitar al implementarlo. */

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */

/*
 * STUB PROVISIONAL (dueño: interfaz).
 * `crearHud` ya busca todos los ids del contrato; `renderizarHud` todavía
 * no pinta nada. Interfaz puede cambiar `ElementosHud` libremente: solo lo
 * usan sus propios módulos.
 */

/**
 * Referencias a los elementos del HUD, los overlays y el diálogo final.
 * @typedef {object} ElementosHud
 * @property {HTMLElement} jugador
 * @property {HTMLElement} tiempo
 * @property {HTMLElement} muertes
 * @property {HTMLElement} penalizacion
 * @property {HTMLElement} efecto
 * @property {HTMLElement} posicion
 * @property {HTMLProgressElement} progreso
 * @property {HTMLTableSectionElement} tablaPosiciones
 * @property {HTMLElement} overlayInicio
 * @property {HTMLElement} overlayCuenta
 * @property {HTMLElement} mensaje
 * @property {HTMLDialogElement} dialogoFinal
 * @property {HTMLElement} finalGanador
 * @property {HTMLElement} finalTiempo
 * @property {HTMLTableSectionElement} tablaFinal
 */

/**
 * Busca en la página todos los elementos que la interfaz actualiza.
 * @param {Document} documento Documento de la página ingame.
 * @returns {ElementosHud} Referencias a los elementos.
 */
export function crearHud(documento) {
  return {
    jugador: buscar(documento, "hud-jugador", HTMLElement),
    tiempo: buscar(documento, "hud-tiempo", HTMLElement),
    muertes: buscar(documento, "hud-muertes", HTMLElement),
    penalizacion: buscar(documento, "hud-penalizacion", HTMLElement),
    efecto: buscar(documento, "hud-efecto", HTMLElement),
    posicion: buscar(documento, "hud-posicion", HTMLElement),
    progreso: buscar(documento, "hud-progreso", HTMLProgressElement),
    tablaPosiciones: buscar(
      documento,
      "tabla-posiciones",
      HTMLTableSectionElement,
    ),
    overlayInicio: buscar(documento, "overlay-inicio", HTMLElement),
    overlayCuenta: buscar(documento, "overlay-cuenta", HTMLElement),
    mensaje: buscar(documento, "mensaje-juego", HTMLElement),
    dialogoFinal: buscar(documento, "dialogo-final", HTMLDialogElement),
    finalGanador: buscar(documento, "final-ganador", HTMLElement),
    finalTiempo: buscar(documento, "final-tiempo", HTMLElement),
    tablaFinal: buscar(documento, "tabla-final", HTMLTableSectionElement),
  };
}

/**
 * Busca un elemento por id y comprueba que sea del tipo esperado.
 * @template {Element} T
 * @param {Document} documento Documento donde buscar.
 * @param {string} id Id del elemento.
 * @param {{new (): T, prototype: T}} tipo Clase esperada, p. ej. `HTMLDialogElement`.
 * @returns {T} El elemento encontrado.
 */
function buscar(documento, id, tipo) {
  const elemento = documento.getElementById(id);
  if (!(elemento instanceof tipo)) {
    throw new Error(`Falta el elemento #${id} en la página de juego.`);
  }
  return elemento;
}

/**
 * Pinta el HUD a partir del estado. Solo lee el estado.
 * @param {ElementosHud} elementos Elementos del HUD.
 * @param {EstadoJuego} estado Estado de la partida.
 * @returns {void}
 */
export function renderizarHud(elementos, estado) {
  // Pendiente de interfaz: tiempo, muertes, penalización, efecto, posición,
  // progreso y tabla de posiciones.
}
