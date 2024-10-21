/* GAME JS */

let start = document.getElementById("button__start");
let ronda = document.getElementById("ronda");
let lose = document.getElementById("lose");
let simon = document.getElementById("simon");
let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let color3 = document.getElementById("color3");
let color4 = document.getElementById("color4");

let colores = [color1, color2, color3, color4];

// Función para realizar el movimiento de colores del juego
let colAnt = "";

// Inicializamos la variable contador de movimientos en 3 para que
// el juego comience directamente haciendo 3 movimientos de luces
// para que sea más dinámico
let contMov = 3;

// Variable para contar los movimientos que se hacen por ronda.
let cont = 0;

// Variable para guardar la secuencia de colores.
let secuencia = [];

// Funcion para representar la secuencia de colores anterior.
const secuenciaAnt = () => {
    inicioRonda();
    let secuenciaAnterior = setInterval(() => {
        console.log("Citando la secuencia anterior...");
        if(colAnt != ""){
            colAnt.style.boxShadow = "none";
        }
        secuencia[cont].style.boxShadow = "0px 0px 15px 5px "+getComputedStyle(secuencia[cont]).getPropertyValue("background-color");
        colAnt = secuencia[cont];
        cont++;
        if(cont == secuencia.length){
            console.log("Cerramos el intervalo");
            clearInterval(secuenciaAnterior);
        }
    }, velocidad);
    
}

let juego;
let rondaTerminada = false;
let tiempo = 0;
let velocidad = 1500;

const mov = () => {

    // Bucle para borrar la iluminación del color anterior.
    if(colAnt != ""){
        colAnt.style.boxShadow = "none";
    }

        let randColor = Math.floor(Math.random()*colores.length);
        colores[randColor].style.boxShadow = "0px 0px 15px 5px "+getComputedStyle(colores[randColor]).getPropertyValue("background-color");
        colAnt = colores[randColor];
        console.log(colAnt);
        secuencia[cont] = colores[randColor];
        cont++;        
        
        if(cont == contMov){
            console.log("Ronda finalizada");
            rondaTerminada = true;
            setTimeout(() => {colAnt.style.boxShadow = "none"}, 999);
            setTimeout(clearInterval(juego), 1000);
        }

    

}

// Función de inicio para cada ronda.
const inicioRonda = () => {
    cont = 0;
    contJugador = 0;
}

// Función de aumento si se pasa de ronda.
const aumento = () => {
    contMov++;
    velocidad -= 300;

}

// Variable que recoge la dificultad seleccionada.
let dificulty = "easy";

// Variable que nos dice si el jugador ha acertado todo o no.
let acertado = false;

// Función para dar turno al jugador.
let contJugador = 0;

const jugador = (event) => {
    console.log(secuencia);
    if(event.target.id == secuencia[contJugador].id){
        console.log("Acierto");
        console.log(contJugador);
        ronda.style.display = "block";
        ronda.textContent = "Has acertado, sigue así";
        contJugador++;
        acertado = true;
    }else{
        console.log("Fallo");
        simon.style.display = "none";
        ronda.style.display = "none";
        lose.style.display = "block";
        acertado = false;
    }  
    
    if(contJugador == cont && acertado){
        console.log("Pasas de ronda");
        ronda.style.display = "none";
        aumento();
        secuenciaAnt();
        setTimeout(() => {
            juego = setInterval(mov , velocidad);
        }, (velocidad*contMov));
         
    }


}


// Función para llevar a cabo el juego.
const jugar = () => {
    
        tiempo = parseInt(1700 * contMov);
        console.log(getComputedStyle(colores[0]).getPropertyValue("background-color"));
        console.log("Turno de la máquina");
        juego = setInterval(mov , velocidad);

        setTimeout(() => {
            console.log("Turno jugador");
            simon.addEventListener("click", jugador);
            
        }, tiempo);

}

start.addEventListener("click", jugar);

