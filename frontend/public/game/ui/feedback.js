/* eslint-disable @typescript-eslint/no-unused-vars -- stub: los parámetros
   son parte del contrato; quitar esta línea al implementarlo. */

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */

/*
 * STUB PROVISIONAL (dueño: interfaz).
 * Interfaz debe reproducir un sonido y mostrar un mensaje en
 * `#mensaje-juego` por cada tipo de evento.
 */

/**
 * Da realimentación al jugador por los eventos de un cuadro.
 * Se llama en cada cuadro, aunque la lista venga vacía.
 * @param {EventoJuego[]} eventos Eventos del cuadro.
 * @param {EstadoJuego} estado Estado de la partida (solo lectura).
 * @returns {void}
 */
export function procesarEventos(eventos, estado) {
  // Pendiente de interfaz: sonidos, mensajes y animaciones por evento.
}
