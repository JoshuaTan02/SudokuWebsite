import {boards} from "./data.js";


var btn = document.getElementById("VisualButton");
var newboardBtn = document.getElementById("NewBoard");
var instantBtn = document.getElementById("InstantButton");
var RefreshButton = document.getElementById("RefreshButton");

let board = boards[Math.floor(Math.random() * boards.length)]
var boardElement = document.getElementsByClassName("board")[0];
var boxes = boardElement.getElementsByClassName("col-1")
var slider = document.getElementById("myRange");
var output = document.getElementById("speed");
var speed = slider.value
output.innerHTML = "Speed: " +speed; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Speed: "+ this.value;
  speed = this.value
} 
btn.onclick= function(){
    
    solvePuzzle2(board)

}
newboardBtn.onclick= function(){
    newBoard()
    // await solvePuzzle2(board)

}
RefreshButton.onclick= function(){
    window.location.reload();

}

instantBtn.onclick = function(){
    solvePuzzle(board)
    // updateBoard(board)
}

function changeColor(object,color,text){
    // console.log("changed color")
    object.style.backgroundColor = color;
    if(text !== "")
    object.textContent  = text
}


 function solvePuzzle(board){
    var square = findSquare(board)
    if (square == null){
        return true
    }
    else{
        var row = square[0]
        var col = square[1]
    }
        // now with an empty square, we will try every possible number
    var index = row*9  + col

    for (var i = 1; i < 10; i++ ){

        if (isValid(board,[row,col],i +"")){
            // console.log("Trying number " + i + " at position: " +row + " "+(col))
            changeColor(boxes[index],"green",i+"")

            board[row][col] = i+""
            // changeColor(board)

            if ( solvePuzzle(board) )
                return true

            board[row][col]  = 0+""
        }
    }
    return false

}

var solvePuzzle2 = async (board) =>{
    // console.log(board)
    var square = findSquare(board)
    if (square == null){
        return true
    }
    else{
        var row = square[0]
        var col = square[1]
    }
        // now with an empty square, we will try every possible number
    var index = row*9  + col

    for (var i = 1; i < 10; i++ ){
        changeColor(boxes[index],"red",i+"")
        await sleep(speed)
        // changeColor(boxes[index],"red",i+"")
        // console.log("trying number " + i)
        if (isValid(board,[row,col],i +"")){
            // console.log("Trying number " + i + " at position: " +row + " "+(col))
            changeColor(boxes[index],"green",i+"")
            board[row][col] = i+""
            // changeColor(board)
            await sleep(speed)
            // console.log(solvePuzzle2(board))
            var solved = await solvePuzzle2(board)
            if ( solved )
                return true

                changeColor(boxes[index],"red","")
                board[row][col]  = 0+""
        }
    }
    return false

}

var sleep = async (seconds) =>{
    return await new Promise ((resolve) => setTimeout(resolve,seconds))
}

function updateBoard(board,color){
    boardElement = document.getElementsByClassName("board")[0];
    boxes = boardElement.getElementsByClassName("col-1")
    for (var i = 0; i< board.length; i++){
        for (var j = 0; j< board[0].length; j++){
                let index = i*9  + j
                if(board[i][j] === "0"){
                boxes[index].style.backgroundColor = "white"
                }
                else{
                    boxes[index].style.backgroundColor = "lightblue"

                }
                if (color != ""){
                    boxes[index].style.backgroundColor = color
                }
                boxes[index].textContent = board[i][j]

            }   
    }

}
function newBoard(){
    board = boards[Math.floor(Math.random() * boards.length)]
    updateBoard(board,"")
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

newBoard()