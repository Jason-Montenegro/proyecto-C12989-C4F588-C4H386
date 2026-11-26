/**
 * Punto de entrada del juego. La página ingame lo carga como módulo, de
 * forma asíncrona y al final del documento.
 *
 * Next.js cambia de página sin recargar y un módulo se ejecuta una sola
 * vez, así que este archivo vigila el documento: cada vez que aparece el
 * canvas `#pista` monta una partida nueva, y cuando el canvas desaparece la
 * partida se desmonta y se vuelve a vigilar.
 */
import { iniciarBucle } from "./cliente/bucle.js";
import { crearColaAcciones } from "./cliente/cola.js";
import { registrarEntrada } from "./cliente/entrada.js";
import { crearParticipantesLocales } from "./cliente/participantes.js";
import { prepararCanvas } from "./cliente/render/vista.js";
import { crearEstadoEjemplo } from "./dev/estadoEjemplo.js";
import { crearEstadoInicial } from "./estado.js";
import { CIRCUITO_1 } from "./mapas/circuito1.js";
import { registrarControles } from "./ui/controles.js";
import { crearHud } from "./ui/hud.js";

/** @typedef {import("./tipos.js").EstadoJuego} EstadoJuego */

const ID_PISTA = "pista";
const PARAMETRO_DEMO = "demo";

/**
 * Monta una partida en cuanto el canvas de la pista está en la página.
 * @returns {void}
 */
function vigilarPagina() {
  if (montarSiHayPista()) {
    return;
  }
  const observador = new MutationObserver(() => {
    if (montarSiHayPista()) {
      observador.disconnect();
    }
  });
  observador.observe(document.body, { childList: true, subtree: true });
}

/**
 * Busca el canvas de la pista y, si está, monta la partida.
 * @returns {boolean} `true` si montó una partida.
 */
function montarSiHayPista() {
  const canvas = document.getElementById(ID_PISTA);
  if (!(canvas instanceof HTMLCanvasElement)) {
    return false;
  }
  montarPartida(canvas);
  return true;
}

/**
 * Setup de la partida: crea el estado, registra los listeners y arranca el
 * bucle. Al desmontarse, quita los listeners globales y vuelve a vigilar.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @returns {void}
 */
function montarPartida(canvas) {
  const controlador = new AbortController();
  const cola = crearColaAcciones();
  const partida = {
    estado: crearEstadoDePartida(canvas.dataset.jugador),
    canvas,
    contexto: prepararCanvas(canvas, controlador.signal),
    hud: crearHud(document),
    cola,
    senal: controlador.signal,
  };
  registrarEntrada(canvas, () => partida.estado, cola.encolar);
  registrarControles(document, cola.encolar);
  iniciarBucle(partida, () => {
    controlador.abort();
    vigilarPagina();
  });
}

/**
 * Crea el estado inicial; con `?demo` en la URL usa el estado de ejemplo.
 * @param {string} [nombreJugador] Usuario con sesión, leído de `data-jugador`.
 * @returns {EstadoJuego} Estado de la partida.
 */
function crearEstadoDePartida(nombreJugador) {
  const parametros = new URLSearchParams(window.location.search);
  if (parametros.has(PARAMETRO_DEMO)) {
    return crearEstadoEjemplo();
  }
  return crearEstadoInicial(
    CIRCUITO_1,
    crearParticipantesLocales(nombreJugador),
  );
}

vigilarPagina();
