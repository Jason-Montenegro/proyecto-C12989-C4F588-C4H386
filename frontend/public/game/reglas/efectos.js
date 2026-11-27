import { IMPULSO_MS } from "../constantes.js";
import { contienePunto } from "./geometria.js";

/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Zona} Zona */

/**
 * Descuenta el impulso y el aturdimiento, y revisa si el jugador pisa una
 * zona de impulso o de terreno lento. El efecto de una zona aplica
 * mientras su centro está dentro.
 * @param {Jugador} jugador Jugador en carrera (se modifica).
 * @param {Zona[]} zonas Zonas del mapa.
 * @param {number} dtMs Tiempo del paso.
 * @returns {EventoJuego[]} "impulso" o "terrenoLento" al entrar a una zona.
 */
export function actualizarEfectos(jugador, zonas, dtMs) {
  jugador.impulsoMs = Math.max(0, jugador.impulsoMs - dtMs);
  jugador.aturdidoMs = Math.max(0, jugador.aturdidoMs - dtMs);
  return [
    ...revisarImpulso(jugador, zonas),
    ...revisarTerrenoLento(jugador, zonas),
  ];
}

/**
 * Sobre una plataforma de impulso, el impulso se recarga a `IMPULSO_MS`.
 * Solo avisa cuando el impulso empieza, no mientras se recarga.
 * @param {Jugador} jugador Jugador en carrera (se modifica).
 * @param {Zona[]} zonas Zonas del mapa.
 * @returns {EventoJuego[]} Evento "impulso" si el efecto empezó.
 */
function revisarImpulso(jugador, zonas) {
  if (!estaEnZona(jugador, zonas, "impulso")) {
    return [];
  }
  const empezo = jugador.impulsoMs === 0;
  jugador.impulsoMs = IMPULSO_MS;
  return empezo ? [{ tipo: "impulso", jugadorId: jugador.id }] : [];
}

/**
 * Marca si el jugador está dentro de terreno lento.
 * @param {Jugador} jugador Jugador en carrera (se modifica).
 * @param {Zona[]} zonas Zonas del mapa.
 * @returns {EventoJuego[]} Evento "terrenoLento" al entrar.
 */
function revisarTerrenoLento(jugador, zonas) {
  const dentro = estaEnZona(jugador, zonas, "lento");
  const entro = dentro && !jugador.enTerrenoLento;
  jugador.enTerrenoLento = dentro;
  return entro ? [{ tipo: "terrenoLento", jugadorId: jugador.id }] : [];
}

/**
 * Indica si el centro del jugador está en alguna zona del tipo dado.
 * @param {Jugador} jugador Jugador a revisar.
 * @param {Zona[]} zonas Zonas del mapa.
 * @param {Zona["tipo"]} tipo Tipo de zona buscado.
 * @returns {boolean} `true` si está dentro de una.
 */
function estaEnZona(jugador, zonas, tipo) {
  return zonas.some(
    (zona) => zona.tipo === tipo && contienePunto(zona, jugador),
  );
}
