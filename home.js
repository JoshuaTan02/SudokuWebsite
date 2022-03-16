import {boards} from "./data.js";


var btn = document.getElementById("VisualButton");
var newboardBtn = document.getElementById("NewBoard");

let board = boards[Math.floor(Math.random() * boards.length)]
var boardElement = document.getElementsByClassName("board")[0];
var boxes = boardElement.getElementsByClassName("col-1")

btn.onclick= function(){
    
    solvePuzzle()

    updateBoard(board)

}
newboardBtn.onclick= function(){
    newBoard()
}

function changeColor(object,color,text){
    // console.log("changed color")
    object.style.backgroundColor = color;
    object.textContent  = text
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 function solvePuzzle(){
    var square = findSquare(board)
    if (square == null){
        return true
    }
    else{
        var row = square[0]
        var col = square[1]
    }
        // now with an empty square, we will try every possible number
    // var index = row*9  + col

    for (var i = 1; i < 10; i++ ){

        // changeColor(boxes[index],"red",i+"")
        // await sleep(250);
        console.log("trying number " + i)
        if (isValid(board,[row,col],i +"")){
            // console.log("Trying number " + i + " at position: " +row + " "+(col))
            // changeColor(boxes[index],"green",i+"")
            // await sleep(250);

            board[row][col] = i+""
            // changeColor(board)
            // updateBoard(board)

            if (solvePuzzle(board))
                return true
            board[row][col]  = 0+""
        }
    }
    return false

    

}



function updateBoard(board){
    boardElement = document.getElementsByClassName("board")[0];
    boxes = boardElement.getElementsByClassName("col-1")
    for (var i = 0; i< board.length; i++){
        for (var j = 0; j< board[0].length; j++){
                let index = i*9  + j
                boxes[index].style.backgroundColor = "white"
                boxes[index].textContent = board[i][j]

            }   
    }

}
function newBoard(){
    board = boards[Math.floor(Math.random() * boards.length)]
    updateBoard(board)
    // console.log(board)
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
        for (var j = xBox*3; j <xBox*3+3; j ++){
            if (board[i][j] === number && i != coordinate[0] && j!= coordinate[1]){
                return false
            }
        }   
    } 

    return true
}

function findSquare(board){
    for (var row = 0; row < board.length; row++){
        for (var col= 0; col < board[0].length; col++){
            if (board[row][col] === '0')
            return [row,col]

        }
    } 
    return null
}

