/** @typedef {import("../coordenadas.js").RectPantalla} RectPantalla */

/**
 * Nombres de las imágenes de `public/assets/` (sin la extensión).
 * @typedef {"agujero"|"caja"|"impulso"|"jugador_azul"|"jugador_rojo"|"meta"
 *   |"muro"|"rebotador"|"sierra"|"terreno_lento"} NombreSprite
 */

/** @type {Map<NombreSprite, HTMLImageElement>} */
const imagenes = new Map();

/**
 * Devuelve la imagen de un sprite y la empieza a cargar la primera vez.
 * La ruta se calcula desde este archivo, así que funciona con cualquier
 * `basePath` (local o GitHub Pages).
 * @param {NombreSprite} nombre Nombre del sprite.
 * @returns {HTMLImageElement} Imagen, quizá todavía cargando.
 */
export function obtenerSprite(nombre) {
  const guardada = imagenes.get(nombre);
  if (guardada) {
    return guardada;
  }
  const imagen = new Image();
  imagen.src = new URL(`../../../assets/${nombre}.png`, import.meta.url).href;
  imagenes.set(nombre, imagen);
  return imagen;
}

/**
 * Indica si una imagen ya se puede dibujar.
 * @param {HTMLImageElement} imagen Imagen a revisar.
 * @returns {boolean} `true` si terminó de cargar sin errores.
 */
function estaLista(imagen) {
  return imagen.complete && imagen.naturalWidth > 0;
}

/**
 * Dibuja un sprite estirado al rectángulo; mientras carga, pinta un color.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {NombreSprite} nombre Sprite a dibujar.
 * @param {RectPantalla} rect Dónde dibujarlo.
 * @param {string} respaldo Color mientras la imagen no está lista.
 * @returns {void}
 */
export function dibujarSprite(contexto, nombre, rect, respaldo) {
  const imagen = obtenerSprite(nombre);
  if (estaLista(imagen)) {
    contexto.drawImage(imagen, rect.x, rect.y, rect.ancho, rect.alto);
    return;
  }
  contexto.fillStyle = respaldo;
  contexto.fillRect(rect.x, rect.y, rect.ancho, rect.alto);
}

/**
 * Rellena el rectángulo repitiendo el sprite como mosaico.
 * @param {CanvasRenderingContext2D} contexto Contexto del canvas.
 * @param {NombreSprite} nombre Sprite del mosaico.
 * @param {RectPantalla} rect Área a rellenar.
 * @param {number} escala Tamaño de cada baldosa respecto a la imagen.
 * @param {string} respaldo Color mientras la imagen no está lista.
 * @returns {void}
 */
export function dibujarMosaico(contexto, nombre, rect, escala, respaldo) {
  const imagen = obtenerSprite(nombre);
  const patron = estaLista(imagen)
    ? contexto.createPattern(imagen, "repeat")
    : null;
  patron?.setTransform(new DOMMatrix().translate(rect.x, rect.y).scale(escala));
  contexto.fillStyle = patron ?? respaldo;
  contexto.fillRect(rect.x, rect.y, rect.ancho, rect.alto);
}
