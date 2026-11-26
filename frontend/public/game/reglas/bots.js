/* eslint-disable @typescript-eslint/no-unused-vars -- stub: los parámetros
   son parte del contrato; quitar esta línea al implementarlo. */

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").Accion} Accion */

/*
 * STUB PROVISIONAL (dueño: reglas).
 * Los bots todavía no se mueven. El bucle llama a esta función en cada
 * cuadro de la fase "enCarrera", así que la versión real debe decidir
 * solo cada cierto tiempo (por ejemplo, cuando el bot llega a su destino).
 */

/**
 * Decide las acciones de los jugadores que no son humanos.
 * No modifica el estado: las acciones pasan luego por `aplicarAccion`.
 * @param {EstadoJuego} estado Estado de la partida (solo lectura).
 * @returns {Accion[]} Acciones "mover" de los bots.
 */
export function decidirBots(estado) {
  return [];
}
