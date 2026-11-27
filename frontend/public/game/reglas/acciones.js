import { ALTO_VISTA, ANCHO_MUNDO, RADIO_JUGADOR } from "../constantes.js";
import { crearEstadoInicial } from "../estado.js";
import { iniciarCarrera } from "./fases.js";
import { limitar } from "./geometria.js";

/** @typedef {import("../tipos.js").Accion} Accion */
/** @typedef {import("../tipos.js").Camara} Camara */
/** @typedef {import("../tipos.js").EstadoJuego} EstadoJuego */
/** @typedef {import("../tipos.js").EventoJuego} EventoJuego */
/** @typedef {import("../tipos.js").Jugador} Jugador */
/** @typedef {import("../tipos.js").MotivoAccionInvalida} MotivoAccionInvalida */
/** @typedef {import("../tipos.js").Participante} Participante */
/** @typedef {import("../tipos.js").Vector2} Vector2 */

/**
 * Aplica una acción de un jugador, de un bot o de la interfaz.
 * Es la única puerta para que algo externo cambie el estado; valida antes
 * de aplicar, como lo hará el servidor en la entrega 06.
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @param {Accion} accion Acción a aplicar.
 * @returns {EventoJuego[]} Eventos producidos por la acción.
 */
export function aplicarAccion(estado, accion) {
  switch (accion.tipo) {
    case "mover":
      return asignarDestino(estado, accion.jugadorId, accion.destino);
    case "iniciar":
      return iniciarCarrera(estado);
    case "reiniciar":
      return reiniciarPartida(estado);
    default:
      return [];
  }
}

/**
 * Fija el punto al que se dirige un jugador, si el movimiento es válido.
 * @param {EstadoJuego} estado Estado de la partida (se modifica).
 * @param {string} jugadorId Jugador que se mueve.
 * @param {Vector2} destino Punto del mundo elegido.
 * @returns {EventoJuego[]} `accionInvalida` con su motivo, o nada.
 */
function asignarDestino(estado, jugadorId, destino) {
  const jugador = estado.jugadores.find((actual) => actual.id === jugadorId);
  if (!jugador) {
    return [rechazar(jugadorId, "jugadorInexistente")];
  }
  const motivo = validarMovimiento(estado, jugador, destino);
  if (motivo) {
    return [rechazar(jugadorId, motivo)];
  }
  jugador.destino = {
    x: limitar(destino.x, RADIO_JUGADOR, ANCHO_MUNDO - RADIO_JUGADOR),
    y: destino.y,
  };
  return [];
}

/**
 * Revisa si un jugador puede moverse hacia un destino.
 * @param {EstadoJuego} estado Estado de la partida.
 * @param {Jugador} jugador Jugador que se quiere mover.
 * @param {Vector2} destino Punto del mundo elegido.
 * @returns {MotivoAccionInvalida|null} Motivo del rechazo, o `null` si es válido.
 */
function validarMovimiento(estado, jugador, destino) {
  if (estado.fase !== "enCarrera") {
    return "fueraDeFase";
  }
  if (jugador.estado === "muerto") {
    return "jugadorMuerto";
  }
  if (jugador.estado === "terminado") {
    return "yaTermino";
  }
  return estaEnVista(destino, estado.camara) ? null : "fueraDePista";
}

/**
 * Indica si un punto está dentro de la pista visible.
 * @param {Vector2} punto Punto del mundo.
 * @param {Camara} camara Cámara de la partida.
 * @returns {boolean} `true` si se puede elegir como destino.
 */
function estaEnVista(punto, camara) {
  return (
    punto.x >= 0 &&
    punto.x <= ANCHO_MUNDO &&
    punto.y >= camara.y &&
    punto.y <= camara.y + ALTO_VISTA
  );
}

/**
 * Crea el evento de una acción rechazada.
 * @param {string} jugadorId Jugador que intentó la acción.
 * @param {MotivoAccionInvalida} motivo Motivo del rechazo.
 * @returns {EventoJuego} Evento "accionInvalida".
 */
function rechazar(jugadorId, motivo) {
  return { tipo: "accionInvalida", jugadorId, datos: { motivo } };
}

/**
 * Devuelve el estado a una partida nueva con los mismos participantes.
 * @param {EstadoJuego} estado Estado de la partida (se reemplaza su contenido).
 * @returns {EventoJuego[]} Sin eventos.
 */
function reiniciarPartida(estado) {
  /** @type {Participante[]} */
  const participantes = estado.jugadores.map(
    ({ id, nombre, esHumano, sprite }) => ({ id, nombre, esHumano, sprite }),
  );
  Object.assign(estado, crearEstadoInicial(estado.mapa, participantes));
  return [];
}
