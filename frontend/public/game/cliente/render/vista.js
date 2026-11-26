import { ALTO_VISTA, ANCHO_MUNDO } from "../../constantes.js";

/**
 * Obtiene el contexto 2D del canvas y mantiene su resolución nítida
 * (incluido `devicePixelRatio`) cada vez que cambia el tamaño de la ventana.
 * Después de esto, el resto del render dibuja siempre en coordenadas
 * lógicas de `ANCHO_MUNDO` × `ALTO_VISTA`.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @param {AbortSignal} senal Quita el listener al terminar la partida.
 * @returns {CanvasRenderingContext2D} Contexto listo para dibujar.
 */
export function prepararCanvas(canvas, senal) {
  const contexto = canvas.getContext("2d");
  if (!contexto) {
    throw new Error("El navegador no permite dibujar en el canvas.");
  }
  ajustarResolucion(canvas, contexto);
  window.addEventListener("resize", () => ajustarResolucion(canvas, contexto), {
    signal: senal,
  });
  return contexto;
}

/**
 * Iguala los píxeles internos del canvas a los píxeles reales de pantalla
 * y escala el contexto para seguir usando coordenadas lógicas.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @returns {void}
 */
function ajustarResolucion(canvas, contexto) {
  const densidad = window.devicePixelRatio || 1;
  canvas.width = Math.round(canvas.clientWidth * densidad) || ANCHO_MUNDO;
  canvas.height = Math.round(canvas.clientHeight * densidad) || ALTO_VISTA;
  contexto.setTransform(
    canvas.width / ANCHO_MUNDO,
    0,
    0,
    canvas.height / ALTO_VISTA,
    0,
    0,
  );
  contexto.imageSmoothingEnabled = false;
}
