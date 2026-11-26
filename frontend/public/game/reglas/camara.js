import { ALTO_VISTA, ZONA_LIDER } from "../constantes.js";
import { matarJugador } from "./muerte.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Mapa} Mapa */

/** Espacio que la vista deja sobre la meta cuando la cámara se detiene. */
const MARGEN_SOBRE_META = 120;

/**
 * Sube la cámara a ritmo constante. Si el líder pasa `ZONA_LIDER` de la
 * vista, la cámara lo sigue. Nunca baja y se detiene al mostrar la meta.
 * @param {EstadoJuego} estado Estado de la partida (se modifica la cámara).
 * @param {number} dtMs Tiempo del paso.
 * @returns {void}
 */
export function avanzarCamara(estado, dtMs) {
  const { camara } = estado;
  const aRitmo = camara.y + (camara.velocidad * dtMs) / 1000;
  const conLider = alturaDelLider(estado.jugadores) - ALTO_VISTA * ZONA_LIDER;
  camara.y = Math.min(Math.max(aRitmo, conLider), alturaMaxima(estado.mapa));
}

/**
 * Altura del jugador en carrera que va más adelante.
 * @param {Jugador[]} jugadores Todos los jugadores.
 * @returns {number} Su altura, o `-Infinity` si nadie está corriendo.
 */
function alturaDelLider(jugadores) {
  return jugadores
    .filter((jugador) => jugador.estado === "corriendo")
    .reduce((maxima, jugador) => Math.max(maxima, jugador.y), -Infinity);
}

/**
 * Altura máxima del borde inferior de la cámara.
 * @param {Mapa} mapa Circuito de la partida.
 * @returns {number} Altura en la que la cámara deja de subir.
 */
function alturaMaxima(mapa) {
  return mapa.metaY + MARGEN_SOBRE_META - ALTO_VISTA;
}

/**
 * Si el borde inferior de la cámara alcanza al jugador, este muere con la
 * penalización por borde, la más cara del juego.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador a revisar (se modifica si muere).
 * @returns {EventoJuego[]} Evento "muerte" con causa "borde".
 */
export function revisarBordeInferior(estado, jugador) {
  if (jugador.estado !== "corriendo" || jugador.y >= estado.camara.y) {
    return [];
  }
  return [matarJugador(jugador, "borde")];
}
