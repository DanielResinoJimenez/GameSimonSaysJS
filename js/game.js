/* GAME JS */

let start = document.getElementById("button__start");
let ronda = document.getElementById("ronda");
let lose = document.getElementById("lose");
let game__container = document.getElementById("game__container");
let simon = document.getElementById("simon");
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let color3 = document.getElementById("color3");
let color4 = document.getElementById("color4");
let points = document.getElementById("points");

let colores = [color1, color2, color3, color4];

// Función para realizar el movimiento de colores del juego
let colAnt = "";
let bgAnt;

// Inicializamos la variable contador de movimientos en 3 para que
// el juego comience directamente haciendo 3 movimientos de luces
// para que sea más dinámico
let contMov = 3;

// Variable para contar los movimientos que se hacen por ronda.
let cont = 0;

// Variable para guardar la secuencia de colores.
let secuencia = [];
let secuenciaAcaba = false;

// Varible donde guardamos el intervalo para después poder terminarle
let juego;

// Variable para anunciar que la ronda acaba
let rondaTerminada = false;

// Variable para almacenar el tiempo que es necesario para que se ejecute un setTimeout
let tiempo = 0;

// Variable que indica la velocidad de ejecución del intervalo y que disminuye con el paso de las rondas
let velocidad = 1500;

// Variable donde almacenamos el color que debe iluminarse
let randColor;


// Funcion para representar la secuencia de colores anterior.
const secuenciaAnt = () => {

    if (colAnt != "") {
        colAnt.style.boxShadow = "none";
    }
    secuencia[cont].style.boxShadow = "0px 0px 15px 5px " + getComputedStyle(secuencia[cont]).getPropertyValue("background-color");
    colAnt = secuencia[cont];
    cont++;
    if (cont == secuencia.length) {
        console.log("Cerramos el intervalo");
        secuenciaAcaba = true;
    }

}

const mov = () => {

    // Bucle para borrar la iluminación del color anterior.
    if (colAnt != "") {
        colAnt.style.boxShadow = "none";

    }

    // Bucle do while para que no se repitan los colores seguidamente
    do {
        randColor = Math.floor(Math.random() * colores.length);

    } while (bgAnt == getComputedStyle(colores[randColor]).getPropertyValue("background-color"));

    if (!secuenciaAcaba && contMov > 3) {
        secuenciaAnt();
    } else {

        colores[randColor].style.boxShadow = "0px 0px 15px 5px " + getComputedStyle(colores[randColor]).getPropertyValue("background-color");
        colAnt = colores[randColor];
        bgAnt = getComputedStyle(colores[randColor]).getPropertyValue("background-color");
        console.log(colAnt);
        secuencia.push(colores[randColor]);
        console.log("Longitud del array secuencia: " + secuencia.length);
        if (secuencia.length == contMov) {
            console.log("Ronda finalizada");
            rondaTerminada = true;
            setTimeout(() => { colAnt.style.boxShadow = "none" }, 999);
            setTimeout(clearInterval(juego), 1000);
        } else {
            console.log("Contador de movimientos" + contMov);
            console.log("Longitud del array secuencia: " + secuencia.length);
            console.log("Ronda en curso");
        }
    }

}

// Función de inicio para cada ronda.
const inicioRonda = () => {
    cont = 0;
    contJugador = 0;
    secuenciaAcaba = false;
    rondaTerminada = false;
}

// Función de aumento si se pasa de ronda.
const aumento = () => {
    contMov++;
    velocidad -= 300;
    finJuego(contMov);
}

// Variable que nos dice si el jugador ha acertado todo o no.
let acertado = false;

// Función para dar turno al jugador.
let contJugador = 0;

const jugador = (event) => {

    if (event.target.id == secuencia[contJugador].id) {
        console.log("Acierto");
        points.textContent = parseInt(points.textContent)+10;
        contJugador++;
        acertado = true;
    } else {
        console.log("Fallo");
        start.textContent = "Restart";
        start.style.display = "block";
        game__container.style.display = "none";
        lose.style.display = "block";
        cont = 0;
        contJugador = 0;
        contMov = 3;
        secuencia = [];
        acertado = false;
    }

    if (contJugador == secuencia.length && acertado) {
        console.log("Pasas de ronda");
        aumento();
        inicioRonda();
        juego = setInterval(mov, velocidad);
    }
}


// Función para llevar a cabo el juego.
const jugar = () => {
    start.style.display = "none";
    lose.style.display = "none";
    game__container.style.display = "flex";
    points.textContent = "0";
    tiempo = parseInt(1700 * contMov);
    console.log("Turno de la máquina");
    juego = setInterval(mov, velocidad);
    setTimeout(() => {
        console.log("Turno jugador");
        simon.addEventListener("click", jugador);

    }, tiempo);

}

const finJuego = (contMov) => {
    if(cont > 7){
        console.log("Has ganado la partida");
        simon.style.display = "none";
    }
}

// Eventos

start.addEventListener("click", jugar);

