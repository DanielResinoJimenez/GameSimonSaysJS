/* JAVASCRIPT INTRO */

let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let color3 = document.getElementById("color3");
let color4 = document.getElementById("color4");

console.log(getComputedStyle(color2).getPropertyValue("background-color"));

const rotarColores = () => {
    let color = getComputedStyle(color3).getPropertyValue("background-color");
    color3.style.backgroundColor = getComputedStyle(color2).getPropertyValue("background-color");
    color2.style.backgroundColor = getComputedStyle(color1).getPropertyValue("background-color");
    color1.style.backgroundColor = getComputedStyle(color4).getPropertyValue("background-color");
    color4.style.backgroundColor = color;
}

const repeticion = () => {
    setInterval(rotarColores, 1000);
}

document.addEventListener("DOMContentLoaded", repeticion);
juego__form.addEventListener("submit", loginUser);

