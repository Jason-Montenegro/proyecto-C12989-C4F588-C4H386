import { dibujarFondo } from "./fondo.js";
import { dibujarJugadores } from "./jugadores.js";
import { dibujarMapa } from "./mapa.js";
import { obtenerPaleta } from "./paleta.js";

/** @typedef {import("../../tipos.js").EstadoJuego} EstadoJuego */

/**
 * Dibuja un cuadro completo a partir del estado. Solo lee el estado:
 * todo lo que se ve en la pista sale de él.
 * @param {CanvasRenderingContext2D} contexto Contexto ya preparado por `prepararCanvas`.
 * @param {EstadoJuego} estado Estado de la partida.
 * @returns {void}
 */
export function dibujarEstado(contexto, estado) {
  const paleta = obtenerPaleta(contexto.canvas);
  dibujarFondo(contexto, estado.camara, paleta);
  dibujarMapa(contexto, estado, paleta);
  dibujarJugadores(contexto, estado, paleta);
}
