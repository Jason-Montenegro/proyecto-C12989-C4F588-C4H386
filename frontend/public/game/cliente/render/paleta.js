/**
 * Colores del render. Se leen de las variables CSS de la pista para que el
 * canvas use la misma paleta que el resto del sitio.
 * @typedef {object} Paleta
 * @property {string} asfalto
 * @property {string} asfaltoOscuro
 * @property {string} linea
 * @property {string} bordilloA
 * @property {string} bordilloB
 * @property {string} primario
 * @property {string} acento
 * @property {string} peligro
 * @property {string} texto
 * @property {string} fondo
 * @property {string} borde
 */

/** @type {WeakMap<HTMLCanvasElement, Paleta>} */
const paletas = new WeakMap();

/**
 * Devuelve la paleta del canvas; la lee del CSS solo la primera vez.
 * @param {HTMLCanvasElement} canvas Canvas de la pista.
 * @returns {Paleta} Colores del render.
 */
export function obtenerPaleta(canvas) {
  const guardada = paletas.get(canvas);
  if (guardada) {
    return guardada;
  }
  const paleta = leerPaleta(getComputedStyle(canvas));
  paletas.set(canvas, paleta);
  return paleta;
}

/**
 * Lee cada color de su variable CSS, con un color de respaldo.
 * @param {CSSStyleDeclaration} estilos Estilos calculados del canvas.
 * @returns {Paleta} Colores del render.
 */
function leerPaleta(estilos) {
  /**
   * @param {string} variable Nombre de la variable CSS.
   * @param {string} respaldo Color si la variable no existe.
   * @returns {string} Color leído.
   */
  const leer = (variable, respaldo) =>
    estilos.getPropertyValue(variable).trim() || respaldo;
  return {
    asfalto: leer("--track-asphalt", "#2b2b40"),
    asfaltoOscuro: leer("--track-asphalt-dark", "#1f1f30"),
    linea: leer("--track-line", "rgb(244 244 248 / 35%)"),
    bordilloA: leer("--track-curb-a", "#ff7088"),
    bordilloB: leer("--track-curb-b", "#f4f4f8"),
    primario: leer("--color-primary", "#ffc233"),
    acento: leer("--color-accent", "#3ddc84"),
    peligro: leer("--color-danger", "#ff7088"),
    texto: leer("--color-text", "#f4f4f8"),
    fondo: leer("--color-bg", "#12122b"),
    borde: leer("--color-border-strong", "#7575b3"),
  };
}
