/*
    17343131 许滨楠
    Homework 5 Game - Maze
       mazeFunction.js
    for behavior definition
*/

var cheated = true;
var started = false;
var info = document.getElementById("infomation");
var einfo = document.getElementById("extraInfo");

function startGame() {
    started = true;
    cheated = true;
    info.style.color = "Black";
    info.innerHTML = "Game started! Watch the water and the crocodiles!";
    einfo.style.color = "Black";
    einfo.innerHTML = "Don't cheat, you should start from Peppa and\
    move to the pizza inside the maze!"
    document.getElementById("mazeMap").style.backgroundImage = "url(../img/bg.jpg)";
}

function fail() {
    if (started) {
        started = false;
        info.style.color = "Red";
        info.innerHTML = "You Lose! You've got Peppa caught by the crocodiles.";
        einfo.style.color = "Red";
        einfo.innerHTML = "Please click on Peppa to start and try again.";
        document.getElementById("mazeMap").style.backgroundImage = "url(../img/deadbg.jpg)";
    }
}

function notCheat() {
    cheated = false;
}

function success() {
    if (!cheated && started) {
        info.style.color = "Blue";
        info.innerHTML = "You Win! You've got Peppa to the pizza safely."
        einfo.style.color = "Blue";
        einfo.innerHTML = "You can still click on Peppa to play again."
    }
    else if (cheated && started) {
        info.style.color = "Green";
        info.innerHTML = "Don't cheat, you should move inside the maze!";
        einfo.style.color = "Green";
        einfo.innerHTML = "But you did it anyway. Click on Peppa to try again."
    }
    started = false;
}