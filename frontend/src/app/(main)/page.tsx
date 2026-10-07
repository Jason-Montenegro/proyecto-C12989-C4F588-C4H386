import Link from "next/link";
import FeatureSection from "@/app/components/FeatureSection";
import group from "@/../public/group.png";
import ranking from "@/../public/ranking.png";
import speed from "@/../public/speed.png";

export default function Home() {
  return (
    <main>
      <section>
        <h1>Hurry to the Top</h1>
        <video controls>{/* Video con gameplay real pendiente */}</video>
        <Link href="/play">Jugar ahora</Link>
      </section>

      <FeatureSection
        title="Juega con tus amigos"
        image={group}
        imageAlt="Jugadores en una partida"
      >
        <p>
          Cada partida reúne de 2 a 10 jugadores que salen desde la misma línea
          y corren al mismo tiempo. Todos ven lo mismo en tiempo real, así que
          puedes chocar con tus amigos, rebotar con ellos y competir por la
          delantera en cada tramo del circuito.
        </p>
      </FeatureSection>

      <FeatureSection
        title="Clasifícate en el top"
        image={ranking}
        imageAlt="Tabla de clasificación"
        imageLeft={false}
      >
        <p>
          Tu tiempo de carrera cuenta. Termina rápido, evita los obstáculos que
          te hacen reaparecer y sube en la tabla de puntuaciones globales para
          demostrar quién es el más veloz.
        </p>
        <Link href="/play">Jugar ahora</Link>
      </FeatureSection>

      <FeatureSection
        title="Aprovecha el circuito"
        image={speed}
        imageAlt="Plataformas de impulso"
      >
        <p>
          Pisa una plataforma de impulso para ganar velocidad durante 2
          segundos, o esquiva las zonas de terreno lento. Elegir bien tu ruta
          entre muros, cajas móviles y agujeros puede decidir la carrera.
        </p>
      </FeatureSection>

      <section>
        <Link href="/play">Jugar ahora</Link>
      </section>
    </main>
  );
}
