# Hurry to the Top

## Descripción

El juego consiste en una competición entre 2 y 10 jugadores que compiten por
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
- En determinadas zonas del circuito aparecerán plataformas de impulso. Cuando
un jugador pase sobre una de estas plataformas, su avatar recibirá
automáticamente un aumento temporal de velocidad durante 2 segundos. Mientras
el efecto esté activo, el jugador conservará las mismas reglas de colisión y
podrá seguir rebotando o muriendo si entra en contacto con un obstáculo
peligroso. El servidor será el encargado de determinar cuándo inicia y termina
el efecto para que todos los jugadores observen el mismo estado.
- Durante la partida aparecerán zonas de terreno lento ubicadas en puntos
específicos del circuito. Cuando un jugador entre en una de estas zonas, su
velocidad de desplazamiento se reducirá mientras permanezca dentro de ella y
volverá a su velocidad normal inmediatamente después de salir. Estas zonas
afectarán a todos los jugadores por igual y su ubicación será establecida al
cargar el mapa de la partida, obligando a los jugadores a decidir entre
atravesarlas directamente o buscar una ruta alternativa.

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

Hurry to the Top cumple con los requisitos mínimos de complejidad establecidos
en la rúbrica, ya que su desarrollo implica mecánicas de movimiento, colisiones,
rebote, muerte/reaparición y cámara dinámica, las cuales requieren
sincronización de estado compartido entre los jugadores y el servidor.

Durante las partidas se espera que la acción más repetida sea el clic o tap para
moverse. Con un mínimo de 2 jugadores por sala, el servidor debe mantener el
estado sincronizado y notificar a cada cliente sus actualizaciones en tiempo
real, actuando como única fuente de verdad: es el servidor quien determina la
posición de jugadores y obstáculos, y valida que cada solicitud de movimiento
cumpla las reglas del juego, evitando así que un cliente pueda hacer trampa
enviando posiciones inválidas.

La carga sobre el servidor crece con el número de jugadores conectados
simultáneamente. Para afrontar esta complejidad consideramos usar Colyseus, un
framework open-source para Node.js que provee manejo de salas (rooms) y
sincronización automática de estado en tiempo real entre clientes, reduciendo
así la necesidad de implementar esta capa desde cero.

## Enlace de espacio de colaboración en ClickUp

<https://sharing.clickup.com/90141522269/l/h/6-901419146253-1/4f18c24bd266d0a>

## Enlace al sitio por github pages

<https://jason-montenegro.github.io/proyecto-C12989-C4F588-C4H386/>

## Usage

### Requisitos de instalación

- Docker

### Instalación y ejecución

Clonar el repositorio

```bash
git clone https://github.com/Jason-Montenegro/proyecto-C12989-C4F588-C4H386.git
```

Ingresar al directorio del proyecto

```bash
cd proyecto-C12989-C4F588-C4H386
```

Iniciar el contenedor de Docker

```bash
docker compose up --build -d
```

Para acceder al cliente, abrir un navegador web y dirigirse a la siguiente URL:

```bash
http://localhost:8080
```

Para detener el contenedor, presionar `Ctrl + C` y luego ejecutar:

```bash
docker compose down
```

Para borrar el contenedor y lo que hay dentro de él, ejecutar:

```bash
docker compose down -v
```

Para ver la salida de un contenedor en ejecución, ejecutar:

```bash
docker logs -f <nombre_del_contenedor>
```

## Metodologia de desarrollo

Ingresar a la rama `develop`, luego crear una rama nueva con el prefijo
`feature/` y el nombre de la funcionalidad a desarrollar.
Una vez terminada la funcionalidad, crear un pull request hacia la rama
`develop` para revisión y merge.
