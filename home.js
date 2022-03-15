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
let board = boards[boardNumber]

function updateBoard(){
    var boardElement = document.getElementsByClassName("board")[0];
    var boxes = boardElement.getElementsByClassName("col-1")
    console.log(boxes.length)

    for (var i = 0; i< board.length; i++){
        for (var j = 0; j< board[0].length; j++){
                let index = i*9  + j
                boxes[index].textContent = board[i][j]
            }   
    }

}

updateBoard()