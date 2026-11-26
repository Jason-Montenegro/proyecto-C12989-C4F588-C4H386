import { ANCHO_MUNDO } from "../../constantes.js";
import { estaEnVista, rectAPantalla } from "../coordenadas.js";
import { dibujarMosaico, dibujarSprite } from "./sprites.js";

/** @typedef {import("../../tipos.js").Camara} Camara */
/** @typedef {import("../../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../../tipos.js").Obstaculo} Obstaculo */
/** @typedef {import("../../tipos.js").Zona} Zona */
/** @typedef {import("./paleta.js").Paleta} Paleta */

const ALTO_META = 48;
const LADO_IMAGEN_META = 128;
const ALTO_IMAGEN_MURO = 128;
const ALTO_LINEA_SALIDA = 8;
const VUELTAS_SIERRA_POR_SEGUNDO = 1.5;
const COLOR_CAJA = "#b07a3c";
const COLOR_AGUJERO = "#05050d";
const COLOR_LENTO = "#6b4a2b";

/**
 * Dibuja la salida, la meta, las zonas y los obstáculos visibles.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {EstadoJuego} estado Estado de la partida (solo lectura).
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarMapa(contexto, estado, paleta) {
  const { camara, mapa } = estado;
  dibujarSalida(contexto, camara, paleta);
  dibujarMeta(contexto, mapa.metaY, camara, paleta);
  mapa.zonas
    .filter((zona) => estaEnVista(zona, camara))
    .forEach((zona) => dibujarZona(contexto, zona, camara, paleta));
  mapa.obstaculos
    .filter((obstaculo) => estaEnVista(obstaculo, camara))
    .forEach((obstaculo) =>
      dibujarObstaculo(contexto, obstaculo, estado, paleta),
    );
}

/**
 * Dibuja la línea de salida en la altura 0.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarSalida(contexto, camara, paleta) {
  const linea = { x: 0, y: -ALTO_LINEA_SALIDA / 2, ancho: ANCHO_MUNDO };
  const rect = rectAPantalla({ ...linea, alto: ALTO_LINEA_SALIDA }, camara);
  contexto.fillStyle = paleta.texto;
  contexto.fillRect(rect.x, rect.y, rect.ancho, rect.alto);
}

/**
 * Dibuja la franja a cuadros de la meta.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {number} metaY Altura de la meta.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarMeta(contexto, metaY, camara, paleta) {
  const franja = { x: 0, y: metaY, ancho: ANCHO_MUNDO, alto: ALTO_META };
  if (!estaEnVista(franja, camara)) {
    return;
  }
  const escala = ALTO_META / LADO_IMAGEN_META;
  dibujarMosaico(
    contexto,
    "meta",
    rectAPantalla(franja, camara),
    escala,
    paleta.texto,
  );
}

/**
 * Dibuja una zona de impulso o de terreno lento.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Zona} zona Zona a dibujar.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarZona(contexto, zona, camara, paleta) {
  const rect = rectAPantalla(zona, camara);
  if (zona.tipo === "impulso") {
    dibujarSprite(contexto, "impulso", rect, paleta.primario);
    return;
  }
  dibujarMosaico(contexto, "terreno_lento", rect, 1, COLOR_LENTO);
}

/**
 * Dibuja un obstáculo con el sprite de su tipo.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Obstaculo} obstaculo Obstáculo a dibujar.
 * @param {EstadoJuego} estado Estado de la partida (para la cámara y el reloj).
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarObstaculo(contexto, obstaculo, estado, paleta) {
  const rect = rectAPantalla(obstaculo, estado.camara);
  switch (obstaculo.tipo) {
    case "muro":
      dibujarMosaico(
        contexto,
        "muro",
        rect,
        rect.alto / ALTO_IMAGEN_MURO,
        paleta.borde,
      );
      break;
    case "sierra":
      dibujarSierra(contexto, rect, estado.tiempoMs, paleta);
      break;
    case "caja":
      dibujarSprite(contexto, "caja", rect, COLOR_CAJA);
      break;
    case "rebotador":
      dibujarSprite(contexto, "rebotador", rect, paleta.acento);
      break;
    default:
      dibujarSprite(contexto, "agujero", rect, COLOR_AGUJERO);
  }
}

/**
 * Dibuja una sierra girando según el tiempo de carrera.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {import("../coordenadas.js").RectPantalla} rect Dónde dibujarla.
 * @param {number} tiempoMs Tiempo de carrera.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function dibujarSierra(contexto, rect, tiempoMs, paleta) {
  const angulo = (tiempoMs / 1000) * VUELTAS_SIERRA_POR_SEGUNDO * 2 * Math.PI;
  contexto.save();
  contexto.translate(rect.x + rect.ancho / 2, rect.y + rect.alto / 2);
  contexto.rotate(angulo);
  dibujarSprite(
    contexto,
    "sierra",
    {
      x: -rect.ancho / 2,
      y: -rect.alto / 2,
      ancho: rect.ancho,
      alto: rect.alto,
    },
    paleta.peligro,
  );
  contexto.restore();
}
