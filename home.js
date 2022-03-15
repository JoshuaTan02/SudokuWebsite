import {boards} from "./data.js";


var btn = document.getElementById("VisualButton");
var newboardBtn = document.getElementById("NewBoard");
var box = document.getElementById("0x1");

btn.onclick= function(){
    solvePuzzle()
}
newboardBtn.onclick= function(){
    newBoard()
}

function changeColor(object){
    object.textContent="5";
    object.style.backgroundColor = "red";
}


function solvePuzzle(){
    changeColor(box)
    console.log(isValid(board,[1,1],'4'))

}



function updateBoard(board){
    var boardElement = document.getElementsByClassName("board")[0];
    var boxes = boardElement.getElementsByClassName("col-1")

    for (var i = 0; i< board.length; i++){
        for (var j = 0; j< board[0].length; j++){
                let index = i*9  + j
                boxes[index].style.backgroundColor = "white"
                boxes[index].textContent = board[i][j]

            }   
    }

}
function newBoard(){

    updateBoard(board)
}




// Starting to do the backtracking now 

function isValid(board,coordinate,number){
    //check the row 
    for (var j = 0; j< board[0].length; j++){
        if (board[coordinate[0]][j] === number && coordinate[1] != j)
            return false;   
    }
    //check the col
    for (var i = 0; i< board.length; i++){
        if (board[i][coordinate[1]] === number && coordinate[0] != i)
            return false;

    }

    //check the 3x3 box
    //we need to mod the coordinate in order to know which box it is in
    var xBox = Math.floor(coordinate[1]/3)
    var yBox = Math.floor(coordinate[0]/3)
    for (var i = yBox*3; i <yBox*3+3; i ++){
        for (var j = xBox*3; i <xBox*3+3; j ++){
            if (board[i][j] === number && (i,j) != coordinate)
            return false
            }   
    } 
    return true
}

function findSquare(board){
    for (var row = 0; row < board.length; row++){
        for (col= 0; col < board[0].length; col++){
            if (board[row][col] === '0')
            return [row,col]

        }
    } 
    return null
}
let boardNumber = Math.floor(Math.random() * boards.length);
let board = boards[boardNumber]
newBoard()
