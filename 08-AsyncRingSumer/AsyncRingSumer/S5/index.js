// 许滨楠 17343131
// Homework 8 Asynchronous Ring Sumer
// server.js for S5

$(document).ready(function() {
    // handlers for the buttons
    var handler = [];
    var orderMark = [0, 1, 2, 3, 4];
    var orderChar = ['A', 'B', 'C', 'D', 'E'];
    // possibility to fail: 0 for definitely fail, 10 for definitely success
    var pf = 5;
    var timeOut = 300;
    class randomError extends Error {
        constructor(message, sum) {
            super();
            this.msg = message;
            this.sum = sum;
        }
    }
    // handler for Button A
    handler[0] = function (currentSum) {
        var clicked = $("#aBtn");
        var content = $(clicked).find("span");
        var flag = (Math.floor(Math.random() * 10) < pf);
        return new Promise((resolve, reject) => {
            $("li.button").addClass("disable");
            $(content).addClass("redSpot");
            $(content).text("...");
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    if (flag) {
                        $("#message").text("这是个天大的秘密");
                    }
                    if ($(content).hasClass("redSpot")) {
                        currentSum += parseInt(res);
                        $(content).text(res);
                        for (var i = 0; i < 5; ++i) {
                            if (!$("span").eq(i).hasClass("redSpot")) {
                                $("li.button").eq(i).removeClass("disable");
                            }
                        }
                        $(clicked).addClass("disable");
                    }
                    setTimeout(() => {
                        if (flag) {
                            resolve(currentSum);
                        } else {
                            reject(new randomError("出现错误</br>这不是个天大的秘密", currentSum));
                        }
                    }, timeOut);
                }
            });
        });
    }

    // handler for Button B
    handler[1] = function(currentSum) {
        var clicked = $("#bBtn");
        var content = $(clicked).find("span");
        var flag = (Math.floor(Math.random() * 10) < pf);
        return new Promise((resolve, reject) => {
            $("li.button").addClass("disable");
            $(content).addClass("redSpot");
            $(content).text("...");
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    if (flag) {
                        $("#message").text("我不知道");
                    }
                    if ($(content).hasClass("redSpot")) {
                        currentSum += parseInt(res);
                        $(content).text(res);
                        for (var i = 0; i < 5; ++i) {
                            if (!$("span").eq(i).hasClass("redSpot")) {
                                $("li.button").eq(i).removeClass("disable");
                            }
                        }
                        $(clicked).addClass("disable");
                    }
                    setTimeout(() => {
                        if (flag) {
                            resolve(currentSum);
                        } else {
                            reject(new randomError("出现错误</br>我知道", currentSum));
                        }
                    }, timeOut);
                }
            });
        });
    }

    // handler for Button C
    handler[2] = function(currentSum) {
        var clicked = $("#cBtn");
        var content = $(clicked).find("span");
        var flag = (Math.floor(Math.random() * 10) < pf);
        return new Promise((resolve, reject) => {
            $("li.button").addClass("disable");
            $(content).addClass("redSpot");
            $(content).text("...");
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    if (flag) {
                        $("#message").text("你不知道");
                    }
                    if ($(content).hasClass("redSpot")) {
                        currentSum += parseInt(res);
                        $(content).text(res);
                        for (var i = 0; i < 5; ++i) {
                            if (!$("span").eq(i).hasClass("redSpot")) {
                                $("li.button").eq(i).removeClass("disable");
                            }
                        }
                        $(clicked).addClass("disable");
                    }
                    setTimeout(() => {
                        if (flag) {
                            resolve(currentSum);
                        } else {
                            reject(new randomError("你知道", currentSum));
                        }
                    }, timeOut);
                }
            });
        });
    }

    // handler for Button D
    handler[3] = function(currentSum) {
        var clicked = $("#dBtn");
        var content = $(clicked).find("span");
        var flag = (Math.floor(Math.random() * 10) < pf);
        return new Promise((resolve, reject) => {
            $("li.button").addClass("disable");
            $(content).addClass("redSpot");
            $(content).text("...");
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    if (flag) {
                        $("#message").text("他不知道");
                    }
                    if ($(content).hasClass("redSpot")) {
                        currentSum += parseInt(res);
                        $(content).text(res);
                        for (var i = 0; i < 5; ++i) {
                            if (!$("span").eq(i).hasClass("redSpot")) {
                                $("li.button").eq(i).removeClass("disable");
                            }
                        }
                        $(clicked).addClass("disable");
                    }
                    setTimeout(() => {
                        if (flag) {
                            resolve(currentSum);
                        } else {
                            reject(new randomError("出现错误</br>他知道", currentSum));
                        }
                    }, timeOut);
                }
            });
        });
    }

    // handler for Button E
    handler[4] = function(currentSum) {
        var clicked = $("#eBtn");
        var content = $(clicked).find("span");
        var flag = (Math.floor(Math.random() * 10) < pf);
        return new Promise((resolve, reject) => {
            $("li.button").addClass("disable");
            $(content).addClass("redSpot");
            $(content).text("...");
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    if (flag) {
                        $("#message").text("才怪");
                    }
                    if ($(content).hasClass("redSpot")) {
                        currentSum += parseInt(res);
                        $(content).text(res);
                        for (var i = 0; i < 5; ++i) {
                            if (!$("span").eq(i).hasClass("redSpot")) {
                                $("li.button").eq(i).removeClass("disable");
                            }
                        }
                        $(clicked).addClass("disable");
                    }
                    setTimeout(() => {
                        if (flag) {
                            resolve(currentSum);
                        } else {
                            reject(new randomError("出现错误</br>不才怪（才不怪？）", currentSum));
                        }
                    }, timeOut);
                }
            });
        });
    }

    // handler for Bubble
    handlerBubble = function(currentSum) {
        return new Promise((resolve, reject) => {
            $("#info-bar").addClass("enable");
            setTimeout(() => {
                $("#info-bar").removeClass("enable").addClass("disable");
                if (Math.floor(Math.random() * 10) < pf) {
                    var msgStr = "楼主异步调用战斗力感人，目测不超过" + currentSum;
                        $("#message").text(msgStr);
                        $("#sum").text(currentSum);
                }
                else {
                    var msgStr = "出现错误</br>楼主异步调用战斗力好菜，目测超过" + currentSum;
                    reject(new randomError(msgStr, currentSum));
                }
            }, timeOut);
        });
    }

    // handler for error
    handlerError = function(randomErr) {
        return new Promise((resolve) => {
            $("#message").html(randomErr.msg);
            resolve(randomErr.sum);
        });
    }

    // handler for error from the bubble
    handlerBubbleError = function(randomErr) {
        $("#message").html(randomErr.msg);
        $("#sum").text(randomErr.sum);
    }
    
    $(".apb").click(function() {
        // can only be clicked once while staying in the ring
        if ($(this).hasClass("isClicked")) {
            return;
        }
        $(this).addClass("isClicked");
        // generate random order
        for (var i = 0; i < 10; ++i) {
            var one = Math.floor(Math.random() * 5);
            var another = Math.floor(Math.random() * 5);
            var t = orderMark[one];
            orderMark[one] = orderMark[another];
            orderMark[another] = t;
        }
        // display the order
        var orderMsg = "";
        for (var i = 0; i < 5; ++i) {
            orderMsg += orderChar[orderMark[i]];
        }
        $("#msg").text(orderMsg);

        handler[orderMark[0]](0)
        .catch(handlerError)
        .then(handler[orderMark[1]])
        .catch(handlerError)
        .then(handler[orderMark[2]])
        .catch(handlerError)
        .then(handler[orderMark[3]])
        .catch(handlerError)
        .then(handler[orderMark[4]])
        .catch(handlerError)
        .then(handlerBubble)
        .catch(handlerBubbleError);
    });

    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        $("span").html("");
        $("span").removeClass("redSpot");
        $(".button").removeClass("disable");
        $(".apb").removeClass("isClicked");
        $("#info-bar").removeClass("enable").addClass("disable");
    });
});