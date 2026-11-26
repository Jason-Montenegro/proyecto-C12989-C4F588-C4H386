import { CANTIDAD_BOTS } from "../constantes.js";

/** @typedef {import("../tipos.js").Participante} Participante */

/** Nombre del jugador local cuando la página no indica uno. */
const NOMBRE_POR_DEFECTO = "Tú";

/**
 * Participantes de una partida local: el jugador de este dispositivo y
 * `CANTIDAD_BOTS` rivales controlados por la computadora.
 * @param {string} [nombreJugador] Nombre del usuario con sesión iniciada.
 * @returns {Participante[]} Lista de participantes, el humano primero.
 */
export function crearParticipantesLocales(nombreJugador) {
  return [
    {
      id: "jugador-1",
      nombre: nombreJugador || NOMBRE_POR_DEFECTO,
      esHumano: true,
      sprite: "jugador_azul",
    },
    ...Array.from({ length: CANTIDAD_BOTS }, (_, indice) => crearBot(indice)),
  ];
}

/**
 * Crea un bot numerado desde 1.
 * @param {number} indice Posición del bot, empezando en 0.
 * @returns {Participante} Bot rival.
 */
function crearBot(indice) {
  const numero = indice + 1;
  return {
    id: `bot-${numero}`,
    nombre: `Bot ${numero}`,
    esHumano: false,
    sprite: "jugador_rojo",
  };
}
