import {
  ALTO_VISTA,
  ANCHO_MUNDO,
  RADIO_JUGADOR,
  REAPARICION_MS,
} from "../constantes.js";
import { centroDe, circuloTocaRectangulo, distancia } from "./geometria.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").Obstaculo} Obstaculo */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/** Espacio extra entre jugadores que reaparecen a la vez. */
const SEPARACION_REAPARICION = 4;

/**
 * Fracción del radio del sprite que cuenta como zona mortal: perdona los
 * roces con el borde transparente de la imagen.
 */
const ALCANCE_MORTAL = 0.8;

/**
 * Mata al jugador si toca una sierra o si su centro cae en un agujero.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador a revisar (se modifica si muere).
 * @returns {EventoJuego[]} Evento "muerte" con causa "obstaculo".
 */
export function revisarObstaculosMortales(estado, jugador) {
  if (jugador.estado !== "corriendo") {
    return [];
  }
  const mortal = estado.mapa.obstaculos.find((obstaculo) =>
    tocaObstaculoMortal(jugador, obstaculo),
  );
  return mortal ? [matarJugador(jugador, "obstaculo")] : [];
}

/**
 * Indica si el jugador toca la parte mortal de un obstáculo.
 * La sierra mata al rozarla; el agujero, cuando el centro cae dentro.
 * @param {Jugador} jugador Jugador a revisar.
 * @param {Obstaculo} obstaculo Obstáculo del mapa.
 * @returns {boolean} `true` si lo mata.
 */
function tocaObstaculoMortal(jugador, obstaculo) {
  const radio = (obstaculo.ancho / 2) * ALCANCE_MORTAL;
  const separacion = distancia(jugador, centroDe(obstaculo));
  if (obstaculo.tipo === "sierra") {
    return separacion < radio + RADIO_JUGADOR;
  }
  return obstaculo.tipo === "agujero" && separacion < radio;
}

/**
 * Deja al jugador muerto: sin efectos ni destino, esperando reaparecer.
 * La usan los obstáculos mortales y el borde inferior de la cámara.
 * @param {Jugador} jugador Jugador que muere (se modifica).
 * @param {"obstaculo"|"borde"} causa Qué lo mató.
 * @returns {EventoJuego} Evento "muerte".
 */
export function matarJugador(jugador, causa) {
  Object.assign(jugador, {
    estado: "muerto",
    reaparicionMs: REAPARICION_MS,
    muertes: jugador.muertes + 1,
    destino: null,
    impulsoMs: 0,
    enTerrenoLento: false,
  });
  return { tipo: "muerte", jugadorId: jugador.id, datos: { causa } };
}

/**
 * Descuenta la espera de un jugador muerto y lo hace reaparecer en el
 * centro de la cámara cuando termina.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador muerto (se modifica).
 * @param {number} dtMs Tiempo del paso.
 * @returns {EventoJuego[]} Evento "reaparicion" cuando vuelve.
 */
export function avanzarReaparicion(estado, jugador, dtMs) {
  jugador.reaparicionMs = Math.max(0, jugador.reaparicionMs - dtMs);
  if (jugador.reaparicionMs > 0) {
    return [];
  }
  Object.assign(jugador, {
    estado: "corriendo",
    ...buscarPuntoDeReaparicion(estado, jugador),
  });
  return [{ tipo: "reaparicion", jugadorId: jugador.id }];
}

/**
 * El centro de la cámara o, si está ocupado, el punto libre más cercano a
 * él sobre la misma línea horizontal. Así varios jugadores que reaparecen
 * juntos no quedan uno encima del otro ni dentro de un obstáculo.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador que reaparece.
 * @returns {Vector2} Punto donde reaparece.
 */
function buscarPuntoDeReaparicion(estado, jugador) {
  const centro = { x: ANCHO_MUNDO / 2, y: estado.camara.y + ALTO_VISTA / 2 };
  const libre = calcularDesvios()
    .map((desvio) => ({ x: centro.x + desvio, y: centro.y }))
    .find((punto) => estaLibre(estado, jugador, punto));
  return libre ?? centro;
}

/**
 * Desvíos horizontales desde el centro, del más cercano al más lejano,
 * alternando derecha e izquierda y sin salir de la pista.
 * @returns {number[]} Desvíos: 0, +paso, -paso, +2·paso, …
 */
function calcularDesvios() {
  const paso = RADIO_JUGADOR * 2 + SEPARACION_REAPARICION;
  const maximo = Math.floor((ANCHO_MUNDO / 2 - RADIO_JUGADOR) / paso);
  const lados = Array.from({ length: maximo }, (_, indice) => [
    (indice + 1) * paso,
    -(indice + 1) * paso,
  ]);
  return [0, ...lados.flat()];
}

/**
 * Indica si un jugador cabe en un punto sin tocar a otro jugador en
 * carrera ni ningún obstáculo.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador que reaparece.
 * @param {Vector2} punto Punto candidato.
 * @returns {boolean} `true` si está libre.
 */
function estaLibre(estado, jugador, punto) {
  const ocupadoPorJugador = estado.jugadores.some(
    (otro) =>
      otro !== jugador &&
      otro.estado === "corriendo" &&
      distancia(otro, punto) < RADIO_JUGADOR * 2,
  );
  const ocupadoPorObstaculo = estado.mapa.obstaculos.some((obstaculo) =>
    circuloTocaRectangulo(punto, RADIO_JUGADOR, obstaculo),
  );
  return !ocupadoPorJugador && !ocupadoPorObstaculo;
}
