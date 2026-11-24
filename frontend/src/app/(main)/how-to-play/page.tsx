import styles from "./how-to-play.module.css";

export default function HowToPlayPage() {
  return (
    <main className={styles.layout}>
      <article className="card">
        <h1 className="cardTitle">Cómo jugar</h1>
        <p>
          El objetivo es llegar al final del circuito antes que los demás
          jugadores. Todos parten de la misma línea de salida, y en cuanto el
          juego da la señal de inicio puedes mover tu personaje: haz clic
          izquierdo en el mapa si juegas en escritorio, o toca la pantalla si
          juegas en móvil.
        </p>
        <p>
          Si chocas con un muro, una caja móvil u otro jugador, tu personaje
          rebota.
        </p>
        <p>
          Algunos obstáculos son peligrosos: si tocas uno, tu personaje
          desaparece y reaparece 1 segundo después en el centro de lo que enfoca
          la cámara en ese momento.
        </p>
      </article>

      <video controls className={styles.video}>
        {/* Video explicativo con gameplay real pendiente */}
      </video>

      <aside className="card">
        <h2 className="cardTitle">Extras</h2>
        <p className={`${styles.extra} ${styles.boost}`}>
          <strong>Plataformas de impulso:</strong> al pasar sobre una, tu
          personaje recibe un aumento de velocidad durante 2 segundos. Mientras
          dure, las reglas de colisión son las mismas: puedes rebotar o morir si
          tocas un obstáculo peligroso.
        </p>
        <p className={`${styles.extra} ${styles.slow}`}>
          <strong>Terreno lento:</strong> en ciertas zonas del circuito tu
          velocidad se reduce mientras permanezcas dentro, y vuelve a la
          normalidad apenas salgas. Afecta a todos por igual, así que decide si
          vale la pena cruzarlas o buscar otra ruta.
        </p>
        <p className={`${styles.extra} ${styles.camera}`}>
          <strong>La cámara:</strong> avanza a ritmo constante y sigue al
          jugador que va al frente. Si te quedas atrás y el borde inferior del
          mapa te alcanza, mueres y recibes una penalización de tiempo en tu
          puntuación final, incluso si luego reapareces y llegas a la delantera.
        </p>
      </aside>
    </main>
  );
}
