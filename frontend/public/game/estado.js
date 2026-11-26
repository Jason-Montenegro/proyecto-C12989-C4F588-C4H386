import {
  ALTO_VISTA,
  ANCHO_MUNDO,
  CUENTA_REGRESIVA_MS,
  VELOCIDAD_CAMARA,
} from "./constantes.js";

/** @typedef {import("./tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("./tipos.js").Jugador} Jugador */
/** @typedef {import("./tipos.js").Mapa} Mapa */
/** @typedef {import("./tipos.js").Participante} Participante */

/** Fracción de la vista que queda bajo la línea de salida al empezar. */
const MARGEN_INFERIOR_SALIDA = 0.12;

/**
 * Crea el estado de una partida nueva con todos los jugadores en la salida.
 * El mapa se copia para que mover obstáculos no altere su definición.
 * @param {Mapa} mapa Circuito de la partida.
 * @param {Participante[]} participantes Jugadores, humanos o bots.
 * @returns {EstadoJuego} Estado listo para la fase "esperando".
 */
export function crearEstadoInicial(mapa, participantes) {
  return {
    fase: "esperando",
    tiempoMs: 0,
    cuentaMs: CUENTA_REGRESIVA_MS,
    camara: {
      y: -ALTO_VISTA * MARGEN_INFERIOR_SALIDA,
      velocidad: VELOCIDAD_CAMARA,
    },
    mapa: structuredClone(mapa),
    jugadores: participantes.map((participante, indice) =>
      crearJugador(participante, indice, participantes.length),
    ),
    jugadorLocalId: buscarJugadorLocal(participantes),
    ganadorId: null,
  };
}

/**
 * Crea un jugador ubicado en su carril de la línea de salida.
 * @param {Participante} participante Datos del participante.
 * @param {number} indice Carril que ocupa, empezando en 0.
 * @param {number} total Cantidad de participantes.
 * @returns {Jugador} Jugador en la salida.
 */
function crearJugador(participante, indice, total) {
  return {
    ...participante,
    x: calcularCarrilSalida(indice, total),
    y: 0,
    destino: null,
    estado: "corriendo",
    reaparicionMs: 0,
    impulsoMs: 0,
    enTerrenoLento: false,
    muertes: 0,
    penalizacionMs: 0,
    tiempoFinalMs: null,
    progreso: 0,
  };
}

/**
 * Reparte a los jugadores a lo ancho de la salida, con el mismo espacio
 * entre ellos y los bordes.
 * @param {number} indice Carril, empezando en 0.
 * @param {number} total Cantidad de carriles.
 * @returns {number} Coordenada x del carril.
 */
function calcularCarrilSalida(indice, total) {
  return (ANCHO_MUNDO * (indice + 1)) / (total + 1);
}

/**
 * Busca el primer participante humano: es el que controla este dispositivo.
 * @param {Participante[]} participantes Lista de participantes.
 * @returns {string} Id del jugador local.
 */
function buscarJugadorLocal(participantes) {
  const humano = participantes.find((participante) => participante.esHumano);
  if (!humano) {
    throw new Error("La partida necesita al menos un jugador humano.");
  }
  return humano.id;
}
