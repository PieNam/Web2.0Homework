/*
    17343131 许滨楠
    Homework 5 Game - Whac-a-mole
       moleFunction.js
    for behavior definition
*/

var gameCurrent = false; //false for pause; true for start
var gameGo = false; //false for over; true for going
var onMap = false;

var gameSS = document.getElementById("startStop");
var gameSitu = document.getElementById("gameMsg");
var pp = document.getElementById("pp");
var timeLeft = document.getElementById("timer");
var point = document.getElementById("score");

var interval;
var moleId;
var prevId;
var boxId;

function fresh() {
    gameCurrent = true;
    gameGo = true;
    gameSitu.value = "Game Running";
    gameSS.value = "Start Game";
    pp.style.backgroundImage = "url(../img/pause.png)";
    timeLeft.value = 31;
    point.value = 0;
    timer();
    generate();
}

function press() {
    gameCurrent = !gameCurrent;
    if (gameCurrent) {
        clearInterval(interval);
        if (!gameGo) {
            gameGo = true;
            timeLeft.value = 31;
            gameSS.value = "Start Game";
            document.getElementById("description").innerHTML = 
            "Test your skill. How many boxes(moles) can you check(hit) in 30 seconds?";
            generate();
        }
        pp.style.backgroundImage = "url(../img/pause.png)";
        gameSitu.value = "Game Running";
        timer();
    }
    else {
        clearInterval(interval);
        pp.style.backgroundImage = "url(../img/play.png)";
        gameSitu.value = "Game Pause";
    }
}

function timer() {
    timeLeft.value -= 1;
    interval = setTimeout("timer()", 1000);
    if (timeLeft.value == 0) over();
}

function over() {
    gameCurrent = false;
    gameGo = false;
    clearInterval(interval);
    document.getElementById("description").innerHTML = "Congratulations! You've finished the game and got "
    + document.getElementById("score").value + " points ! ";
    pp.style.backgroundImage = "url(../img/play.png)";
    gameSS.value = "Stop Game";
    gameSitu.value = "Game Stop";
}

function generate() {
    if (onMap == false) {
        onMap = true;
        moleId = parseInt((Math.random() * 60) + 1);
        document.getElementById(moleId).value = 1;
        boxId = moleId + 60;
        document.getElementById(boxId).style.backgroundImage = "url(../img/mole.png)";
    }
}

function hit(n) {
    if (n == moleId && gameCurrent) {
        ++point.value;
        document.getElementById(boxId).style.backgroundImage = "none";
        document.getElementById(moleId).value = 0;
        document.getElementById(moleId).checked = false;
        onMap = false;
        generate();
    }
    else if (gameCurrent) --point.value;
}