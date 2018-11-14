/*
    17343131 许滨楠
    Homework 4 Calculator
       calculator.js
    for behavior definition
*/

var res = document.getElementById("result");
var flag = false;

function command(e) {
    var str;
    if (!flag) str = "";
    else str = res.value;
    str = (str == "0" ? "" : str);
    if (e == 10) str += '(';
    else if (e == 11) str += ')';
    else if (e == -1) str += '+';
    else if (e == -2) str += '-';
    else if (e == -3) str += '*';
    else if (e == -4) str += '/';
    else if (e == -5) str += '.';
    else str += e;
    res.value = str;
    flag = true;
}

function calc() {
    var str = res.value;
    try {
        res.value = eval(res.value);
    }
    catch (EvalError) {
        alert('Invalid. Please check the expression and try again.');
    }
    if (res.value == Infinity) alert('Invalid. Divide by zero.')
    flag = false;
}

function del() {
    var str = res.value;
    str = str.substring(0, str.length - 1);
    str = (str == "" ? 0 : str);
    res.value = str;
}

function clean() {
    res.value = 0;
}