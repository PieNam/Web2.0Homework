/*
    17343131 许滨楠
    Homework 6 Fifteen Puzzle
       Puzzle.js
    for behavior definition
*/

var isStarted = false;
var positions = ["0 0 0 0", "0 0 0 125px", "0 0 0 250px", "0 0 0 375px",
                 "125px 0 0 0", "125px 0 0 125px", "125px 0 0 250px", "125px 0 0 375px",
                 "250px 0 0 0", "250px 0 0 125px", "250px 0 0 250px", "250px 0 0 375px",
                 "375px 0 0 0", "375px 0 0 125px", "375px 0 0 250px", "375px 0 0 375px"];
var positionMark;
var blocks = document.getElementsByClassName("block");
var empty = document.getElementById("block15");
var emptyPos;
var startBtn = document.getElementById("start");
var sand = document.getElementById("sand");
var timer = document.getElementById("timer");
var interval;
var count;

// for starting game
startBtn.onclick = function startGame() {
    isStarted = true;
    empty.style.opacity = "0";
    empty.style.transition = "0.5s";
    document.getElementById("finishText").style.opacity = "0";
    document.getElementById("finish").style.marginTop = "200px";
    count = -1;
    sand.className = "rotate";
    clearInterval(interval);
    timing();
    generate();
}

// for timing function
function timing() {
    ++count;
    var hr = parseInt(count / 3600 % 24);
    var min = parseInt(count / 60 % 60);
    var sec = parseInt(count % 60);
    var res = "";
    res = formatTime(hr) + ":" + formatTime(min) + ":" + formatTime(sec);
    timer.innerHTML = res;
    interval = setTimeout("timing()", 1000);
}

// for generating map
function generate() {
    // waste 1
    // for (var i = 0; i < (parseInt(Math.random() * 10) + 50); ++i) {
    //     var a, b;
    //     var flag = true;
    //     while (flag) {
    //         a = parseInt(Math.random() * 16);
    //         b = parseInt(Math.random() * 16);
    //         if (a != b) flag = false;
    //     }
    //     swap(a, b);
    // }
    positionMark = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    emptyPos = 15;
    var times = parseInt(Math.random() * 50) + 100;
    for (var i = 0; i < times; ++i) {
        var flag = true;
        while (flag) {
            var dir = parseInt(Math.random() * 4);
            switch(dir) {
                case 0:
                    if (inMap(emptyPos - 4)) {
                        swap(emptyPos, emptyPos - 4);
                        emptyPos = emptyPos - 4;
                        flag = false;
                    }
                    break;
                case 1:
                    if (inMap(emptyPos - 1) && emptyPos % 4 != 0) {
                        swap(emptyPos, emptyPos - 1);
                        emptyPos = emptyPos - 1;
                        flag = false;
                    }
                    break;
                case 2:
                    if (inMap(emptyPos + 1) && (emptyPos + 1) % 4 != 0) {
                        swap(emptyPos, emptyPos + 1);
                        emptyPos = emptyPos + 1;
                        flag = false;
                    }
                    break;
                case 3:
                    if (inMap(emptyPos + 4)) {
                        swap(emptyPos, emptyPos + 4);
                        emptyPos = emptyPos + 4;
                        flag = false;
                    }
                    break;
                default:
                    break;
            }
        }
    }
    for (var i = 0; i < 16; ++i) {
        blocks[positionMark[i]].style.margin = positions[i];
    }
}

//for blocks moving
function move(blockNum) {
    if (!isStarted) return;
    var n;
    for (var i = 0; i < 16; ++i) {
        if (positionMark[i] == blockNum) n = i;
    }
    if (inMap(n - 1) && n % 4 != 0 && emptyPos == n - 1) {
        swap(n, n - 1);
        emptyPos = n; 
    }
    else if (inMap(n + 1) && (n + 1) % 4 != 0 && emptyPos == n + 1) {
        swap(n, n + 1);
        emptyPos = n; 
    }
    else if (inMap(n - 4) && emptyPos == n - 4) {
        swap(n, n - 4);
        emptyPos = n; 
    }
    else if (inMap(n + 4) && emptyPos == n + 4) {
        swap(n, n + 4);
        emptyPos = n; 
    }
    for (var i = 0; i < 16; ++i) {
        blocks[positionMark[i]].style.margin = positions[i];
    }
    check();
}

//for game checking
function check() {
    var flag = true;
    for (var i = 0; i < 16; ++i) {
        if (positionMark[i] != i) flag = false;
    }
    if (flag) {
        clearInterval(interval);
        // empty.style.backgroundImage = "url(../img/image.jpg)"
        // empty.style.backgroundSize = "500px 500px";
        // empty.style.backgroundPosition = "-375px -375px";
        empty.style.opacity = "1";
        empty.style.transition = "2s";
        isStarted = false;
        document.getElementById("finishText").style.opacity = "1";
        document.getElementById("finish").style.marginTop = "-100px";
    }
}

//own functions
function swap(a, b) {
    var t = positionMark[a];
    positionMark[a] = positionMark[b];
    positionMark[b] = t;
}

function formatTime(n) {
    if (n < 10) n = "0" + n;
    return n;
}

function inMap(n) {
    return (n >= 0 && n <= 15);
}