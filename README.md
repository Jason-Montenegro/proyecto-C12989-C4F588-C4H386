# Hurry to the Top

## Descripción

El juego consiste en una competición entre 4 y 10 jugadores que compiten por
llegar al final de un circuito de obstáculos. Deberán partir del mismo lugar
y evitar colisionar con obstáculos en el camino. El juego pretende ser
jugable desde navegadores web, ya sea de escritorio o móviles. Esta basado en
partidas multijugador respaldadas por un servidor que gestione el estado de las
partidas del juego centralizadamente.

A continuación, algunas mecánicas principales que caracterizan el juego
propiamente eximiendo funcionalidades externas a las mecánicas de partidas:

- Los jugadores partirán de una línea de salida delimitada en el mapa del
circuito, y en cuanto el juego determine el inicio, los jugadores podrán
mover su avatar mediante clic izquierdo (en escritorio) o tap en la pantalla
(en móvil). El juego sincronizará el movimiento de los jugadores en tiempo real
para permitir colisiones entre ellos y los obstáculos del mapa.
- Los jugadores al colisionar con un obstáculo, ya sea, un muro, una caja
movediza, y otros jugadores, "rebotarán" hacia el camino mas corto en sentido
contrario al que venían dentro de su trayectoria. Por ejemplo, si avatar A corre
desde la izquierda por abajo hacia un punto, y colisiona con un muro, entonces
se moverá ligeramente hacia la izquierda o abajo dependiendo de cuál distancia
sea más corta.
- Los jugadores pueden colisionar con obstáculos que los puedan "matar", es
decir, su avatar desaparecerá de la posicion en que se encontraba y reaparecera
1 segundo después en el centro del enfoque de la cámara actual de la partida.
- El mapa se establecerá al inicio de las partidas y habrá una cámara de enfoque
de la partida que siga a un ritmo constante, aunque este se puede ver afectado
si algún jugador lleva la delantera, por lo que entonces la cámara se moverá
junto a ese jugador. Esto provocará que jugadores mas atrasados, sean presa del
borde del mapa.
- Si un jugador es rebasado por el borde inferior del mapa morirá y tendrá una
penalización temporal. Es decir, aunque llegue a reaparecer en el centro del
enfoque de la cámara del juego y llegue a la delantera, al final su puntuación
de tiempo tendra una penalización dependiendo del puntaje que haya obtenido.

Los requisitos anteriores corresponden al listado de funcionalidades que
describen concretamente la dinámica de juego **en partida**. Adicional a esta
lista se tienen previstas unas pantallas que conformaran parte del sitio
completo.
Entre esas pantallas se contempla una "landing page", pantalla de "About" acerca
de los autores, una pantalla de "lobby", una pantalla de inicio de sesion. Se
contempla también agregar un sistema de tabla de puntuaciones globales,
funcionalidad de configuración de audio y lenguaje en la pantalla de lobby.

## Integrantes con roles

### **C4H386** Jason Montenegro Navarro

- Servidor
- Diseño

### - **C4F588** Juan Gonzalez Marquez

- Cliente
- Coordinación

### - **C12989** Raul Gadea Alfaro

- Frontend
- QA

## Justificación de requisitos

<!-- Falta justificacion -->

## Enlace de espacio de colaboración en ClickUp

<https://sharing.clickup.com/90141522269/l/h/6-901419146253-1/4f18c24bd266d0a>
