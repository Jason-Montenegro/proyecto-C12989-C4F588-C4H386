import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hurry to the Top",
  description:
    "El juego consiste en una competición entre 2 y 10 jugadores que compiten "
    + "por llegar al final de un circuito de obstáculos. Deberán partir del "
    + "mismo lugar y evitar colisionar con obstáculos en el camino. El juego "
    + "pretende ser jugable desde navegadores web, ya sea de escritorio o "
    + "móviles. Esta basado en partidas multijugador respaldadas por un "
    + "servidor que gestione el estado de las partidas del juego "
    + "centralizadamente.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
