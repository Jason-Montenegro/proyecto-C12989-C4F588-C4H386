import { MAX_DT_MS } from "../constantes.js";
import { aplicarAccion } from "../reglas/acciones.js";
import { actualizarEstado } from "../reglas/actualizar.js";
import { decidirBots } from "../reglas/bots.js";
import { procesarEventos } from "../ui/feedback.js";
import { renderizarHud } from "../ui/hud.js";
import { renderizarOverlays } from "../ui/overlays.js";
import { dibujarEstado } from "./render/canvas.js";

/** @typedef {import("../tipos.js").Accion} Accion */
/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../ui/hud.js").ElementosHud} ElementosHud */
/** @typedef {import("./cola.js").ColaAcciones} ColaAcciones */

/**
 * Todo lo que necesita el bucle para correr una partida.
 * @typedef {object} Partida
 * @property {EstadoJuego} estado Única fuente de verdad.
 * @property {HTMLCanvasElement} canvas
 * @property {CanvasRenderingContext2D} contexto
 * @property {ElementosHud} hud
 * @property {ColaAcciones} cola
 * @property {AbortSignal} senal Se aborta al terminar, para quitar listeners.
 */

/**
 * Reloj interno del bucle; no forma parte del estado del juego.
 * @typedef {object} Reloj
 * @property {number} anterior Marca de tiempo del cuadro anterior.
 * @property {number} solicitud Id del `requestAnimationFrame` pendiente.
 */

/**
 * Arranca el bucle de cuadros. Se detiene solo cuando el canvas sale de la
 * página (por ejemplo, al navegar a otra pantalla) y se pausa mientras la
 * pestaña está oculta.
 * @param {Partida} partida Partida a ejecutar.
 * @param {() => void} alTerminar Se llama una vez, cuando el bucle se detiene.
 * @returns {void}
 */
export function iniciarBucle(partida, alTerminar) {
  /** @type {Reloj} */
  const reloj = { anterior: performance.now(), solicitud: 0 };

  /** @param {number} ahora Marca de tiempo del cuadro. */
  const cuadro = (ahora) => {
    if (!partida.canvas.isConnected) {
      alTerminar();
      return;
    }
    const dtMs = Math.min(Math.max(ahora - reloj.anterior, 0), MAX_DT_MS);
    reloj.anterior = ahora;
    ejecutarCuadro(partida, dtMs);
    reloj.solicitud = requestAnimationFrame(cuadro);
  };

  reloj.solicitud = requestAnimationFrame(cuadro);
  pausarAlOcultar(reloj, cuadro, partida.senal);
}

/**
 * Detiene el bucle mientras la pestaña está oculta y lo reanuda sin
 * contar el tiempo que estuvo en pausa.
 * @param {Reloj} reloj Reloj del bucle.
 * @param {(ahora: number) => void} cuadro Función de cada cuadro.
 * @param {AbortSignal} senal Quita el listener al terminar la partida.
 * @returns {void}
 */
function pausarAlOcultar(reloj, cuadro, senal) {
  document.addEventListener(
    "visibilitychange",
    () => {
      cancelAnimationFrame(reloj.solicitud);
      if (document.visibilityState === "visible") {
        reloj.anterior = performance.now();
        reloj.solicitud = requestAnimationFrame(cuadro);
      }
    },
    { signal: senal },
  );
}

/**
 * Un cuadro: acciones, simulación, dibujo, interfaz y realimentación.
 * @param {Partida} partida Partida en curso.
 * @param {number} dtMs Tiempo desde el cuadro anterior, ya acotado.
 * @returns {void}
 */
function ejecutarCuadro(partida, dtMs) {
  const { estado } = partida;
  const eventos = [
    ...aplicarAcciones(estado, partida.cola.vaciar()),
    ...aplicarAcciones(estado, obtenerAccionesBots(estado)),
    ...actualizarEstado(estado, dtMs),
  ];
  dibujarEstado(partida.contexto, estado);
  renderizarHud(partida.hud, estado);
  renderizarOverlays(partida.hud, estado);
  procesarEventos(eventos, estado);
}

/**
 * Aplica una lista de acciones en orden y junta sus eventos.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Accion[]} acciones Acciones a aplicar.
 * @returns {EventoJuego[]} Eventos producidos.
 */
function aplicarAcciones(estado, acciones) {
  return acciones.flatMap((accion) => aplicarAccion(estado, accion));
}

/**
 * Pide sus acciones a los bots, solo durante la carrera.
 * @param {EstadoJuego} estado Estado de la partida.
 * @returns {Accion[]} Acciones de los bots.
 */
function obtenerAccionesBots(estado) {
  return estado.fase === "enCarrera" ? decidirBots(estado) : [];
}
