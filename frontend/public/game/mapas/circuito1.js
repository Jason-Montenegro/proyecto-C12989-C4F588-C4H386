import { ANCHO_MUNDO } from "../constantes.js";

/** @typedef {import("../tipos.js").Mapa} Mapa */
/** @typedef {import("../tipos.js").Obstaculo} Obstaculo */
/** @typedef {import("../tipos.js").Zona} Zona */
/** @typedef {import("../tipos.js").MovimientoObstaculo} MovimientoObstaculo */

/**
 * Obstáculo escrito a mano; el id, el origen y el movimiento se completan
 * al construir el mapa.
 * @typedef {object} DefinicionObstaculo
 * @property {import("../tipos.js").TipoObstaculo} tipo
 * @property {number} x
 * @property {number} y
 * @property {number} ancho
 * @property {number} alto
 * @property {MovimientoObstaculo} [movimiento]
 */

/** @typedef {Omit<Zona, "id">} DefinicionZona */

/**
 * Obstáculos del circuito, de la salida (abajo) a la meta (arriba).
 * @type {DefinicionObstaculo[]}
 */
const OBSTACULOS = [
  // Tramo 1: un muro central obliga a elegir lado.
  { tipo: "muro", x: 170, y: 320, ancho: 200, alto: 40 },
  // Tramo 2: embudo hacia el centro con una sierra en la salida.
  { tipo: "muro", x: 0, y: 720, ancho: 180, alto: 40 },
  { tipo: "muro", x: 360, y: 720, ancho: 180, alto: 40 },
  { tipo: "sierra", x: 250, y: 900, ancho: 40, alto: 40 },
  // Tramo 3: caja que se desliza de lado a lado y un agujero.
  {
    tipo: "caja",
    x: 120,
    y: 1450,
    ancho: 60,
    alto: 60,
    movimiento: { eje: "x", amplitud: 150, periodoMs: 3000 },
  },
  { tipo: "agujero", x: 380, y: 1650, ancho: 80, alto: 80 },
  { tipo: "rebotador", x: 60, y: 1850, ancho: 50, alto: 50 },
  { tipo: "rebotador", x: 430, y: 1850, ancho: 50, alto: 50 },
  // Tramo 4: zigzag de muros.
  { tipo: "muro", x: 0, y: 2050, ancho: 320, alto: 40 },
  { tipo: "muro", x: 220, y: 2450, ancho: 320, alto: 40 },
  // Tramo 5: sierras que suben y bajan.
  {
    tipo: "sierra",
    x: 90,
    y: 2700,
    ancho: 40,
    alto: 40,
    movimiento: { eje: "y", amplitud: 60, periodoMs: 1800 },
  },
  {
    tipo: "sierra",
    x: 250,
    y: 2760,
    ancho: 40,
    alto: 40,
    movimiento: { eje: "y", amplitud: 60, periodoMs: 1800 },
  },
  {
    tipo: "sierra",
    x: 410,
    y: 2700,
    ancho: 40,
    alto: 40,
    movimiento: { eje: "y", amplitud: 60, periodoMs: 1800 },
  },
  // Tramo 6: dos cajas cruzadas y agujeros antes de la meta.
  {
    tipo: "caja",
    x: 60,
    y: 3250,
    ancho: 60,
    alto: 60,
    movimiento: { eje: "x", amplitud: 180, periodoMs: 2500 },
  },
  {
    tipo: "caja",
    x: 420,
    y: 3450,
    ancho: 60,
    alto: 60,
    movimiento: { eje: "x", amplitud: -180, periodoMs: 2500 },
  },
  { tipo: "agujero", x: 40, y: 3700, ancho: 80, alto: 80 },
  { tipo: "agujero", x: 420, y: 3700, ancho: 80, alto: 80 },
  { tipo: "muro", x: 200, y: 3950, ancho: 140, alto: 40 },
];

/**
 * Zonas de impulso y de terreno lento.
 * @type {DefinicionZona[]}
 */
const ZONAS = [
  { tipo: "impulso", x: 220, y: 500, ancho: 100, alto: 80 },
  { tipo: "lento", x: 120, y: 1100, ancho: 420, alto: 200 },
  { tipo: "impulso", x: 400, y: 2200, ancho: 100, alto: 80 },
  { tipo: "lento", x: 0, y: 2950, ancho: 300, alto: 180 },
  { tipo: "impulso", x: 380, y: 3000, ancho: 100, alto: 80 },
  { tipo: "lento", x: 140, y: 3550, ancho: 260, alto: 120 },
];

/**
 * Completa un obstáculo con su id, su posición de origen y su movimiento.
 * @param {DefinicionObstaculo} definicion Datos escritos a mano.
 * @param {number} indice Posición en la lista, para el id.
 * @returns {Obstaculo} Obstáculo listo para el estado.
 */
function completarObstaculo(definicion, indice) {
  return {
    ...definicion,
    id: `obstaculo-${indice + 1}`,
    origen: { x: definicion.x, y: definicion.y },
    movimiento: definicion.movimiento ?? null,
  };
}

/**
 * Completa una zona con su id.
 * @param {DefinicionZona} definicion Datos escritos a mano.
 * @param {number} indice Posición en la lista, para el id.
 * @returns {Zona} Zona lista para el estado.
 */
function completarZona(definicion, indice) {
  return { ...definicion, id: `zona-${indice + 1}` };
}

/**
 * Primer circuito del juego.
 * @type {Mapa}
 */
export const CIRCUITO_1 = {
  ancho: ANCHO_MUNDO,
  metaY: 4300,
  obstaculos: OBSTACULOS.map(completarObstaculo),
  zonas: ZONAS.map(completarZona),
};
