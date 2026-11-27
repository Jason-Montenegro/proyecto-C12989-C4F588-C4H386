/** @typedef {import("../tipos.js").Accion} Accion */
/** @typedef {import("../tipos.js").Despachador} Despachador */

/**
 * Cola donde la entrada y los controles dejan sus acciones hasta el
 * siguiente cuadro. Así ningún listener modifica el estado directamente.
 * @typedef {object} ColaAcciones
 * @property {Despachador} encolar Agrega una acción al final.
 * @property {() => Accion[]} vaciar Devuelve las acciones pendientes y las quita.
 */

/**
 * Crea una cola de acciones vacía.
 * @returns {ColaAcciones} Cola nueva.
 */
export function crearColaAcciones() {
  /** @type {Accion[]} */
  const pendientes = [];
  return {
    encolar: (accion) => {
      pendientes.push(accion);
    },
    vaciar: () => pendientes.splice(0),
  };
}
