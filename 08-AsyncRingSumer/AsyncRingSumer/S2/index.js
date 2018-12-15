// 许滨楠 17343131
// Homework 8 Asynchronous Ring Sumer
// server.js for S2

$(document).ready(function() {
    var sum = 0;
    var btnClicked = 0;

    var orderMark = 0;
    var robotFlag = false;
    $(".apb").click(function() {
        robotFlag = true;
        $("li.button").eq(orderMark).trigger("click", orderMark);
        robotFlag = false;
    });
    
    $("li.button").click(function(event, orderMark) {
        var clicked = $(this);
        var content = $(this).find("span");
        $("#info-bar").addClass("disable");
        if (!$(clicked).hasClass("disable") && robotFlag == true) {
            // disable all buttons
            $("li.button").addClass("disable");

            // set red "..." massage when waiting
            $(content).addClass("redSpot");
            $(content).text("...");

            // send request and get the number
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("redSpot")) {
                    $(content).text(res);
                    ++btnClicked;
                    // enableOtherBtns();
                    for (var i = 0; i < 5; ++i) {
                        if (!$("span").eq(i).hasClass("redSpot")) {
                            $("li.button").eq(i).removeClass("disable");
                        }
                    }
                    $(clicked).addClass("disable");

                    // show the sum result after all buttons clicked
                    if (btnClicked == 5) {
                        $("#info-bar").removeClass("disable").addClass("enable");
                        setTimeout(function() {
                            sum = 0;
                            for (var i = 0; i < 5; ++i) {
                                var numbers = $("span").eq(i);
                                sum += parseInt($(numbers).text());
                            }
                            $("#sum").text(sum);
                            $("#info-bar").removeClass("enable").addClass("disable");
                        }, 500);
                    }
                    setTimeout(function() {
                        if (orderMark <= 4) {
                            ++orderMark;
                            robotFlag = true;
                            $("li.button").eq(orderMark).trigger("click", orderMark);
                            robotFlag = false;
                        }
                    }, 500);
                }
            });
        }
    });

    // reset the calculator when the menu shrink
    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        $("span").html("");
        $("span").removeClass("redSpot");
        $(".button").removeClass("disable");
        $("#info-bar").removeClass("enable").addClass("disable");
        sum = 0;
        btnClicked = 0;
    });
});