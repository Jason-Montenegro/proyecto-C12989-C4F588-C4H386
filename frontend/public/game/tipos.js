/**
 * Contrato de tipos del juego "Hurry to the Top".
 *
 * Este archivo solo contiene definiciones JSDoc: no se ejecuta lógica.
 * Todos los módulos describen sus parámetros con estos tipos, por ejemplo:
 * `@typedef {import("./tipos.js").EstadoJuego} EstadoJuego`.
 *
 * Convenciones de coordenadas del mundo:
 * - `x` va de 0 a `ANCHO_MUNDO`.
 * - `y` es la altura: crece hacia la meta (salida en `y = 0`).
 * - Los rectángulos se ubican por su esquina inferior izquierda.
 *
 * Cambiar este archivo requiere un PR revisado por el dueño del motor.
 */

/** @typedef {{x: number, y: number}} Vector2 */

/** @typedef {"esperando"|"cuentaRegresiva"|"enCarrera"|"terminada"} Fase */

/** @typedef {"corriendo"|"muerto"|"terminado"} EstadoJugador */

/**
 * Tipos de obstáculo. `sierra` y `agujero` matan; el resto hace rebotar.
 * @typedef {"muro"|"caja"|"rebotador"|"sierra"|"agujero"} TipoObstaculo
 */

/**
 * Vaivén de un obstáculo móvil alrededor de su origen:
 * `origen + amplitud * sin(2π * tiempoMs / periodoMs)` sobre el eje indicado.
 * Una amplitud negativa arranca hacia el lado contrario.
 * @typedef {object} MovimientoObstaculo
 * @property {"x"|"y"} eje
 * @property {number} amplitud Desplazamiento máximo, en unidades del mundo.
 * @property {number} periodoMs Duración de una ida y vuelta completa.
 */

/**
 * @typedef {object} Obstaculo
 * @property {string} id
 * @property {TipoObstaculo} tipo
 * @property {number} x Esquina inferior izquierda (mundo).
 * @property {number} y
 * @property {number} ancho
 * @property {number} alto
 * @property {Vector2} origen Posición base para los obstáculos móviles.
 * @property {MovimientoObstaculo|null} movimiento `null` si es fijo.
 */

/**
 * @typedef {object} Zona
 * @property {string} id
 * @property {"impulso"|"lento"} tipo
 * @property {number} x Esquina inferior izquierda (mundo).
 * @property {number} y
 * @property {number} ancho
 * @property {number} alto
 */

/**
 * @typedef {object} Mapa
 * @property {number} ancho
 * @property {number} metaY Altura de la línea de meta.
 * @property {Obstaculo[]} obstaculos
 * @property {Zona[]} zonas
 */

/** @typedef {"jugador_azul"|"jugador_rojo"} SpriteJugador */

/**
 * @typedef {object} Participante
 * @property {string} id
 * @property {string} nombre
 * @property {boolean} esHumano
 * @property {SpriteJugador} sprite
 */

/**
 * @typedef {object} Jugador
 * @property {string} id
 * @property {string} nombre
 * @property {boolean} esHumano
 * @property {SpriteJugador} sprite
 * @property {number} x
 * @property {number} y
 * @property {Vector2|null} destino
 * @property {EstadoJugador} estado
 * @property {number} reaparicionMs Ms que faltan para reaparecer (0 = vivo).
 * @property {number} impulsoMs Ms que le quedan de impulso (0 = sin impulso).
 * @property {boolean} enTerrenoLento
 * @property {number} muertes
 * @property {number} penalizacionMs
 * @property {number|null} tiempoFinalMs Tiempo + penalización al llegar a la meta.
 * @property {number} progreso De 0 a 1 (`y / metaY`).
 */

/**
 * @typedef {object} Camara
 * @property {number} y Altura del borde inferior de la vista.
 * @property {number} velocidad Unidades por segundo.
 */

/**
 * Única fuente de verdad de la partida.
 * @typedef {object} EstadoJuego
 * @property {Fase} fase
 * @property {number} tiempoMs Tiempo de carrera desde el evento "inicio".
 * @property {number} cuentaMs Ms que faltan de la cuenta regresiva.
 * @property {Camara} camara
 * @property {Mapa} mapa
 * @property {Jugador[]} jugadores
 * @property {string} jugadorLocalId Jugador humano que sigue el HUD.
 * @property {string|null} ganadorId
 */

/**
 * @typedef {{tipo: "mover", jugadorId: string, destino: Vector2}
 *   | {tipo: "iniciar"}
 *   | {tipo: "reiniciar"}} Accion
 */

/** @typedef {(accion: Accion) => void} Despachador */

/**
 * @typedef {"colision"|"muerte"|"reaparicion"|"impulso"|"terrenoLento"
 *   |"meta"|"cuenta"|"inicio"|"victoria"|"accionInvalida"} TipoEvento
 */

/**
 * Por qué se rechazó una acción "mover".
 * @typedef {"jugadorInexistente"|"fueraDeFase"|"jugadorMuerto"|"yaTermino"
 *   |"fueraDePista"} MotivoAccionInvalida
 */

/**
 * @typedef {object} DatosEvento
 * @property {"obstaculo"|"borde"} [causa]
 * @property {number} [segundos]
 * @property {MotivoAccionInvalida} [motivo]
 */

/**
 * @typedef {object} EventoJuego
 * @property {TipoEvento} tipo
 * @property {string} [jugadorId]
 * @property {DatosEvento} [datos]
 */

/**
 * @typedef {object} FilaClasificacion
 * @property {number} posicion
 * @property {string} jugadorId
 * @property {string} nombre
 * @property {EstadoJugador} estado
 * @property {number} progreso
 * @property {number|null} tiempoFinalMs
 */

export {};
