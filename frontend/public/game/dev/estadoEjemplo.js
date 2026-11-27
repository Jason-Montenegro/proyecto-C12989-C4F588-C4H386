import { crearParticipantesLocales } from "../cliente/participantes.js";
import { crearEstadoInicial } from "../estado.js";
import { CIRCUITO_1 } from "../mapas/circuito1.js";
import { calcularPenalizacion } from "../reglas/muerte.js";
import { actualizarProgreso } from "../reglas/puntaje.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */

/**
 * Estado de ejemplo para desarrollar y probar el render y la interfaz sin
 * depender de las reglas. Se ve abriendo `/ingame/?demo`.
 * @returns {EstadoJuego} Estado a mitad de carrera.
 */
export function crearEstadoEjemplo() {
  const estado = crearEstadoInicial(CIRCUITO_1, crearParticipantesLocales());
  estado.fase = "enCarrera";
  estado.tiempoMs = 42350;
  estado.camara.y = 1124;
  ubicarJugadoresDeEjemplo(estado.jugadores);
  actualizarProgreso(estado);
  return estado;
}

/**
 * Pone a cada jugador en uno de los casos que la interfaz debe mostrar:
 * - el jugador local con impulso y un destino;
 * - un bot dentro de terreno lento;
 * - un bot muerto esperando reaparecer, con penalización;
 * - un bot adelantado con dos muertes, aturdido tras reaparecer.
 * @param {Jugador[]} jugadores Jugadores de la partida (se modifican).
 * @returns {void}
 */
function ubicarJugadoresDeEjemplo([local, lento, muerto, adelantado]) {
  Object.assign(local, {
    x: 440,
    y: 1400,
    destino: { x: 470, y: 1600 },
    impulsoMs: 1200,
  });
  Object.assign(lento, { x: 300, y: 1200, enTerrenoLento: true });
  Object.assign(muerto, {
    estado: "muerto",
    reaparicionMs: 600,
    muertes: 1,
    penalizacionMs: calcularPenalizacion(0, "borde"),
  });
  Object.assign(adelantado, {
    x: 120,
    y: 1700,
    muertes: 2,
    aturdidoMs: 1200,
    penalizacionMs:
      calcularPenalizacion(0, "obstaculo") + calcularPenalizacion(1, "borde"),
  });
}
