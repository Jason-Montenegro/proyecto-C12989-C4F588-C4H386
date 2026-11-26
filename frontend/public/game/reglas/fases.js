/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */

/*
 * STUB PROVISIONAL (dueño: flujo de carrera e interfaz).
 * Solo cubre lo mínimo para jugar:
 * - "iniciar" salta directo a "enCarrera", sin cuenta regresiva;
 * - el reloj de carrera avanza.
 * Pendiente: cuenta regresiva con evento "cuenta" por segundo, evento
 * "inicio" al terminarla, fin de carrera (todos en la meta o
 * TIEMPO_LIMITE_MS), ganadorId (menor tiempoFinalMs) y evento "victoria".
 */

/**
 * Arranca la partida desde la fase "esperando". La llama `aplicarAccion`
 * con la acción "iniciar".
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @returns {EventoJuego[]} Eventos del arranque.
 */
export function iniciarCarrera(estado) {
  if (estado.fase !== "esperando") {
    return [];
  }
  estado.fase = "enCarrera";
  return [{ tipo: "inicio" }];
}

/**
 * Avanza la fase de la partida y su reloj. La llama `actualizarEstado` en
 * cada paso, en cualquier fase, antes de simular la pista.
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @param {number} dtMs Tiempo del paso.
 * @returns {EventoJuego[]} Eventos de fase ("cuenta", "inicio", "victoria").
 */
export function actualizarFases(estado, dtMs) {
  if (estado.fase === "enCarrera") {
    estado.tiempoMs += dtMs;
  }
  return [];
}
