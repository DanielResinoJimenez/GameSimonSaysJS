/* LOGIN JAVASCRIPT */

// Declaración de variables
let loginCont = document.getElementById("login");
let form__login = document.getElementById("form__login");
let form__button = document.getElementById("form__button");
let nickname = document.getElementById("nickname");
let dificulty = document.getElementById("dificulty");
let avisoNick = document.getElementById("avisoNick");
let avisoDif = document.getElementById("avisoDif");
let marcadores = document.getElementById("marcadores");
let nickname__text = document.getElementById("nickname__text");
let dificulty__text = document.getElementById("dificulty__text");


// Declaración de funciones



const login = (event) => {

    if(nickname.value == ""){
        avisoNick.style.display = "block";
    }
    if(dificulty.value == ""){
        avisoDif.style.display = "block";
    }
    if(nickname.value != "" && dificulty.value != ""){
        avisoNick.style.display = "none";
        avisoDif.style.display = "none";
        loginCont.style.display = "none";
        marcadores.style.display = "flex";
        game__container.style.display = "block";
        nickname__text.textContent = nickname.value;
        dificulty__text.textContent = dificulty.value;
    }

}

// Eventos

form__button.addEventListener("click", login);