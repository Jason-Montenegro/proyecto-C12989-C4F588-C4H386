/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").FilaClasificacion} FilaClasificacion */

/*
 * STUB PROVISIONAL (dueño: flujo de carrera e interfaz).
 * `revisarMeta` y `actualizarProgreso` ya funcionan para poder terminar la
 * carrera; se pueden conservar o reescribir.
 * Pendiente en `obtenerClasificacion`: ordenar primero a los que
 * terminaron (por tiempoFinalMs) y luego al resto (por progreso).
 */

/**
 * Marca como "terminado" a quien cruza la meta y fija su tiempo final
 * (tiempo de carrera + penalización).
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @returns {EventoJuego[]} Un evento "meta" por cada jugador que llega.
 */
export function revisarMeta(estado) {
  return estado.jugadores
    .filter(
      (jugador) =>
        jugador.estado === "corriendo" && jugador.y >= estado.mapa.metaY,
    )
    .map((jugador) => {
      jugador.estado = "terminado";
      jugador.destino = null;
      jugador.tiempoFinalMs = estado.tiempoMs + jugador.penalizacionMs;
      return { tipo: "meta", jugadorId: jugador.id };
    });
}

/**
 * Calcula el progreso de cada jugador hacia la meta (de 0 a 1).
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @returns {void}
 */
export function actualizarProgreso(estado) {
  estado.jugadores.forEach((jugador) => {
    jugador.progreso = Math.min(Math.max(jugador.y / estado.mapa.metaY, 0), 1);
  });
}

/**
 * Calcula la tabla de posiciones a partir del estado; no se guarda.
 * @param {EstadoJuego} estado Estado de la partida.
 * @returns {FilaClasificacion[]} Filas ordenadas de la primera posición a la última.
 */
export function obtenerClasificacion(estado) {
  return [...estado.jugadores]
    .sort((primero, segundo) => segundo.progreso - primero.progreso)
    .map((jugador, indice) => ({
      posicion: indice + 1,
      jugadorId: jugador.id,
      nombre: jugador.nombre,
      estado: jugador.estado,
      progreso: jugador.progreso,
      tiempoFinalMs: jugador.tiempoFinalMs,
    }));
}
