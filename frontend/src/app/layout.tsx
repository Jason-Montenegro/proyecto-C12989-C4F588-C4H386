import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hurry to the Top",
  description:
    "El juego consiste en una competición entre 2 y 10 jugadores que compiten " +
    "por llegar al final de un circuito de obstáculos. Deberán partir del " +
    "mismo lugar y evitar colisionar con obstáculos en el camino. El juego " +
    "pretende ser jugable desde navegadores web, ya sea de escritorio o " +
    "móviles. Esta basado en partidas multijugador respaldadas por un " +
    "servidor que gestione el estado de las partidas del juego " +
    "centralizadamente.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
