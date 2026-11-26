/** @typedef {import("../tipos.js").Despachador} Despachador */

/*
 * STUB PROVISIONAL (dueño: interfaz).
 * Ya conecta "Iniciar" y "Jugar de nuevo". Interfaz debe completar el
 * resto (por ejemplo, cerrar el diálogo final o confirmar al abandonar).
 */

/**
 * Registra los listeners de los botones de la partida.
 * @param {Document} documento Documento de la página ingame.
 * @param {Despachador} despachar Encola acciones para el bucle.
 * @returns {void}
 */
export function registrarControles(documento, despachar) {
  documento
    .getElementById("boton-iniciar")
    ?.addEventListener("click", () => despachar({ tipo: "iniciar" }));
  documento
    .getElementById("boton-reiniciar")
    ?.addEventListener("click", () => despachar({ tipo: "reiniciar" }));
}
