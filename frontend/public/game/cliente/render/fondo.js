import { ALTO_VISTA, ANCHO_MUNDO } from "../../constantes.js";
import { alturaAPantalla } from "../coordenadas.js";

/** @typedef {import("../../tipos.js").Camara} Camara */
/** @typedef {import("./paleta.js").Paleta} Paleta */

const ANCHO_BORDILLO = 12;
const LARGO_FRANJA_BORDILLO = 48;
const LARGO_RAYA_CARRIL = 64;
const ANCHO_RAYA_CARRIL = 4;

/**
 * Dibuja el asfalto, los bordillos y las rayas de carril. Bordillos y
 * rayas se desplazan con la cámara para que se note el avance.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarFondo(contexto, camara, paleta) {
  pintarAsfalto(contexto, paleta);
  pintarBordillos(contexto, camara, paleta);
  pintarRayasCarril(contexto, camara, paleta);
}

/**
 * Pinta el asfalto con un degradado vertical.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function pintarAsfalto(contexto, paleta) {
  const degradado = contexto.createLinearGradient(0, 0, 0, ALTO_VISTA);
  degradado.addColorStop(0, paleta.asfalto);
  degradado.addColorStop(1, paleta.asfaltoOscuro);
  contexto.fillStyle = degradado;
  contexto.fillRect(0, 0, ANCHO_MUNDO, ALTO_VISTA);
}

/**
 * Pinta los bordillos de los costados alternando dos colores.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function pintarBordillos(contexto, camara, paleta) {
  recorrerFranjas(camara, LARGO_FRANJA_BORDILLO, (indice, arriba) => {
    contexto.fillStyle = esPar(indice) ? paleta.bordilloA : paleta.bordilloB;
    contexto.fillRect(0, arriba, ANCHO_BORDILLO, LARGO_FRANJA_BORDILLO);
    contexto.fillStyle = esPar(indice) ? paleta.bordilloB : paleta.bordilloA;
    contexto.fillRect(
      ANCHO_MUNDO - ANCHO_BORDILLO,
      arriba,
      ANCHO_BORDILLO,
      LARGO_FRANJA_BORDILLO,
    );
  });
}

/**
 * Pinta dos líneas discontinuas que dividen la pista en tres carriles.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
function pintarRayasCarril(contexto, camara, paleta) {
  contexto.fillStyle = paleta.linea;
  recorrerFranjas(camara, LARGO_RAYA_CARRIL, (indice, arriba) => {
    if (!esPar(indice)) {
      return;
    }
    [ANCHO_MUNDO / 3, (ANCHO_MUNDO * 2) / 3].forEach((centro) =>
      contexto.fillRect(
        centro - ANCHO_RAYA_CARRIL / 2,
        arriba,
        ANCHO_RAYA_CARRIL,
        LARGO_RAYA_CARRIL,
      ),
    );
  });
}

/**
 * Recorre las franjas de altura fija que se ven con la cámara actual.
 * @param {Camara} camara Cámara de la partida.
 * @param {number} largo Alto de cada franja en el mundo.
 * @param {(indice: number, arriba: number) => void} dibujar Recibe el número
 *   de franja y la y de su borde superior en el canvas.
 * @returns {void}
 */
function recorrerFranjas(camara, largo, dibujar) {
  const primera = Math.floor(camara.y / largo);
  const ultima = Math.ceil((camara.y + ALTO_VISTA) / largo);
  for (let indice = primera; indice <= ultima; indice += 1) {
    dibujar(indice, alturaAPantalla((indice + 1) * largo, camara));
  }
}

/**
 * Indica si un entero es par, también para negativos.
 * @param {number} numero Entero a revisar.
 * @returns {boolean} `true` si es par.
 */
function esPar(numero) {
  return Math.abs(numero % 2) === 0;
}
