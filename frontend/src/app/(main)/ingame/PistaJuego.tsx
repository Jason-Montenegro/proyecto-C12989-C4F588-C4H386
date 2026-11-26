"use client";

import { useAuth } from "@/app/components/AuthProvider";

type PistaJuegoProps = {
  className: string;
};

export default function PistaJuego({ className }: PistaJuegoProps) {
  const { user } = useAuth();

  return (
    <canvas
      id="pista"
      width={540}
      height={960}
      className={className}
      data-jugador={user?.username ?? ""}
    >
      <p>
        Tu navegador no soporta el elemento canvas, necesario para mostrar el
        circuito, los obstáculos y los demás jugadores. Actualiza tu navegador o
        usa uno compatible para jugar Hurry to the Top.
      </p>
    </canvas>
  );
}
