import { crearParticipantesLocales } from "../cliente/participantes.js";
import { PENALIZACION_BORDE_MS } from "../constantes.js";
import { crearEstadoInicial } from "../estado.js";
import { CIRCUITO_1 } from "../mapas/circuito1.js";

/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */

/**
 * Estado de ejemplo para desarrollar y probar el render y la interfaz sin
 * depender de las reglas. Se ve abriendo `/ingame/?demo`.
 *
 * Muestra a la vez los casos que la interfaz tiene que representar:
 * - el jugador local con impulso y un destino;
 * - un bot dentro de terreno lento;
 * - un bot muerto esperando reaparecer, con penalización;
 * - un bot adelantado con dos muertes.
 * @returns {EstadoJuego} Estado a mitad de carrera.
 */
export function crearEstadoEjemplo() {
  const estado = crearEstadoInicial(CIRCUITO_1, crearParticipantesLocales());
  estado.fase = "enCarrera";
  estado.tiempoMs = 42350;
  estado.camara.y = 1000;
  const [local, lento, muerto, adelantado] = estado.jugadores;
  Object.assign(local, {
    x: 270,
    y: 1400,
    destino: { x: 330, y: 1700 },
    impulsoMs: 1200,
  });
  Object.assign(lento, { x: 300, y: 1200, enTerrenoLento: true });
  Object.assign(muerto, {
    estado: "muerto",
    reaparicionMs: 600,
    muertes: 1,
    penalizacionMs: PENALIZACION_BORDE_MS,
  });
  Object.assign(adelantado, { x: 120, y: 1700, muertes: 2 });
  estado.jugadores.forEach((jugador) => {
    jugador.progreso = jugador.y / estado.mapa.metaY;
  });
  return estado;
}
