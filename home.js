import {boards} from "./data.js";

var btn = document.getElementById("VisualButton");
var box = document.getElementById("0x1");

function solvePuzzle(){
    changeColor(box)
}

function changeColor(object){
    object.textContent="5";
    object.style.backgroundColor = "red";
}
let boardNumber = Math.floor(Math.random() * boards.length);
console.log(boards[boardNumber])