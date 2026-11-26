/**
 * Constantes de ajuste del juego. Las distancias van en unidades del mundo,
 * las velocidades en unidades por segundo y las duraciones en milisegundos.
 */

/** Ancho del mundo; coincide con el ancho lógico del canvas. */
export const ANCHO_MUNDO = 540;

/** Alto de la porción del mundo que muestra la cámara. */
export const ALTO_VISTA = 960;

export const RADIO_JUGADOR = 20;
export const VELOCIDAD_BASE = 220;
export const MULTIPLICADOR_IMPULSO = 1.8;
export const MULTIPLICADOR_LENTO = 0.5;
export const IMPULSO_MS = 2000;
export const REAPARICION_MS = 1000;
export const CUENTA_REGRESIVA_MS = 3000;
export const VELOCIDAD_CAMARA = 60;

/** Si el líder supera esta fracción de la vista, la cámara lo sigue. */
export const ZONA_LIDER = 0.6;

export const DISTANCIA_REBOTE = 24;

/** El rebotador empuja más lejos que un muro o una caja. */
export const MULTIPLICADOR_REBOTADOR = 2;
export const PENALIZACION_BORDE_MS = 5000;
export const TIEMPO_LIMITE_MS = 180000;

/** Paso de tiempo máximo por cuadro, para evitar saltos tras una pausa. */
export const MAX_DT_MS = 50;

export const CANTIDAD_BOTS = 3;
