import {
  ALTO_VISTA,
  ANCHO_MUNDO,
  ATURDIMIENTO_MS,
  RADIO_JUGADOR,
} from "../../constantes.js";
import { alturaAPantalla } from "../coordenadas.js";
import { dibujarAvatar } from "./avatar.js";

/** @typedef {import("../../tipos.js").Camara} Camara */
/** @typedef {import("../../tipos.js").Jugador} Jugador */
/** @typedef {import("../../tipos.js").Vector2} Vector2 */
/** @typedef {import("./paleta.js").Paleta} Paleta */

const PARPADEO_MS = 100;
const OPACIDAD_FANTASMA = 0.55;
const COPIAS_ESTELA = 3;
const SEPARACION_ESTELA = 12;
const TINTE_LENTO = "rgb(107 74 43 / 55%)";
const TAMANO_CRUZ = 8;

/** Cuántos ms tarda el anillo de aturdimiento en avanzar una unidad. */
const GIRO_ATURDIDO_MS = 20;

/**
 * Mientras el jugador está muerto, lo dibuja parpadeando en el centro de
 * la cámara, que es donde va a reaparecer.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Jugador} jugador Jugador muerto.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarFantasmaReaparicion(contexto, jugador, paleta) {
  const visible = Math.floor(jugador.reaparicionMs / PARPADEO_MS) % 2 === 0;
  if (!visible) {
    return;
  }
  const centro = { x: ANCHO_MUNDO / 2, y: ALTO_VISTA / 2 };
  contexto.save();
  contexto.globalAlpha = OPACIDAD_FANTASMA;
  dibujarAvatar(contexto, jugador, centro);
  dibujarAnillo(contexto, centro, paleta.peligro);
  contexto.restore();
}

/**
 * Dibuja una estela detrás del jugador, en sentido contrario a su destino,
 * mientras dura el impulso.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Jugador} jugador Jugador con impulso.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarEstela(contexto, jugador, camara, paleta) {
  const atras = calcularDireccionContraria(jugador);
  contexto.fillStyle = paleta.primario;
  for (let copia = 1; copia <= COPIAS_ESTELA; copia += 1) {
    const distancia = copia * SEPARACION_ESTELA;
    contexto.globalAlpha = 0.45 / copia;
    contexto.beginPath();
    contexto.arc(
      jugador.x + atras.x * distancia,
      alturaAPantalla(jugador.y + atras.y * distancia, camara),
      RADIO_JUGADOR * (1 - copia * 0.15),
      0,
      2 * Math.PI,
    );
    contexto.fill();
  }
  contexto.globalAlpha = 1;
}

/**
 * Calcula el vector unitario opuesto a la dirección de avance.
 * Sin destino, la estela apunta hacia la salida.
 * @param {Jugador} jugador Jugador con impulso.
 * @returns {Vector2} Vector unitario en coordenadas del mundo.
 */
function calcularDireccionContraria(jugador) {
  if (!jugador.destino) {
    return { x: 0, y: -1 };
  }
  const dx = jugador.x - jugador.destino.x;
  const dy = jugador.y - jugador.destino.y;
  const largo = Math.hypot(dx, dy);
  return largo > 0 ? { x: dx / largo, y: dy / largo } : { x: 0, y: -1 };
}

/**
 * Anillo discontinuo que gira alrededor del jugador aturdido; se achica a
 * medida que se le pasa el aturdimiento.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Vector2} centro Centro del avatar en el canvas.
 * @param {number} aturdidoMs Ms de aturdimiento que le quedan.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarAturdimiento(contexto, centro, aturdidoMs, paleta) {
  const restante = Math.min(aturdidoMs / ATURDIMIENTO_MS, 1);
  contexto.save();
  contexto.globalAlpha = 1;
  contexto.strokeStyle = paleta.peligro;
  contexto.lineWidth = 3;
  contexto.setLineDash([6, 6]);
  contexto.lineDashOffset = aturdidoMs / GIRO_ATURDIDO_MS;
  contexto.beginPath();
  contexto.arc(
    centro.x,
    centro.y,
    RADIO_JUGADOR + 4 + restante * 8,
    0,
    2 * Math.PI,
  );
  contexto.stroke();
  contexto.restore();
}

/**
 * Cubre al jugador con un tinte de barro mientras pisa terreno lento.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Vector2} centro Centro del avatar en el canvas.
 * @returns {void}
 */
export function dibujarTinteLento(contexto, centro) {
  contexto.fillStyle = TINTE_LENTO;
  contexto.beginPath();
  contexto.arc(centro.x, centro.y, RADIO_JUGADOR, 0, 2 * Math.PI);
  contexto.fill();
}

/**
 * Resalta al jugador local con un anillo y marca su destino con una cruz,
 * para confirmar dónde se hizo clic.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Jugador} jugador Jugador local.
 * @param {Camara} camara Cámara de la partida.
 * @param {Paleta} paleta Colores del render.
 * @returns {void}
 */
export function dibujarMarcaLocal(contexto, jugador, camara, paleta) {
  const centro = { x: jugador.x, y: alturaAPantalla(jugador.y, camara) };
  dibujarAnillo(contexto, centro, paleta.primario);
  if (jugador.destino) {
    const destino = {
      x: jugador.destino.x,
      y: alturaAPantalla(jugador.destino.y, camara),
    };
    dibujarCruz(contexto, destino, paleta.primario);
  }
}

/**
 * Dibuja un anillo alrededor de un avatar.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Vector2} centro Centro del avatar en el canvas.
 * @param {string} color Color del anillo.
 * @returns {void}
 */
function dibujarAnillo(contexto, centro, color) {
  contexto.strokeStyle = color;
  contexto.lineWidth = 3;
  contexto.beginPath();
  contexto.arc(centro.x, centro.y, RADIO_JUGADOR + 4, 0, 2 * Math.PI);
  contexto.stroke();
}

/**
 * Dibuja una cruz pequeña en un punto del canvas.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {Vector2} punto Centro de la cruz.
 * @param {string} color Color de la cruz.
 * @returns {void}
 */
function dibujarCruz(contexto, punto, color) {
  contexto.strokeStyle = color;
  contexto.lineWidth = 2;
  contexto.beginPath();
  contexto.moveTo(punto.x - TAMANO_CRUZ, punto.y - TAMANO_CRUZ);
  contexto.lineTo(punto.x + TAMANO_CRUZ, punto.y + TAMANO_CRUZ);
  contexto.moveTo(punto.x + TAMANO_CRUZ, punto.y - TAMANO_CRUZ);
  contexto.lineTo(punto.x - TAMANO_CRUZ, punto.y + TAMANO_CRUZ);
  contexto.stroke();
}
