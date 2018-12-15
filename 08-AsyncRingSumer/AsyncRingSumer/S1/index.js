// 许滨楠 17343131
// Homework 8 Asynchronous Ring Sumer
// server.js for S1

$(document).ready(function() {
    var sum = 0;
    var btnClicked = 0;
    
    $("#info-bar").addClass("disable");
    $("li.button").click(function() {
        var clicked = $(this);
        var content = $(this).find("span");
        if (!$(clicked).hasClass("disable")) {
            // disable all buttons
            $("li.button").addClass("disable");

            // set red "..." massage when waiting
            $(content).addClass("redSpot");
            $(content).addClass("visited");
            $(content).text("...");

            // send request and get the number
            $.get("http://localhost:3000", function(res, status, XHR) {
                if ($(content).hasClass("visited")) {
                    $(content).text(res);
                    ++btnClicked;
                    // enableOtherBtns();
                    for (var i = 0; i < 5; ++i) {
                        if (!$("span").eq(i).hasClass("visited")) {
                            $("li.button").eq(i).removeClass("disable");
                        }
                    }
                    $(clicked).addClass("disable");

                    // show the sum result after all buttons clicked
                    if (btnClicked >= 5) {
                        $("#info-bar").removeClass("disable").addClass("enable");
                        $("#info-bar").click(function() {
                            sum = 0;
                            for (var i = 0; i < 5; ++i) {
                                var numbers = $("span").eq(i);
                                sum += parseInt($(numbers).text());
                            }
                            $("#sum").text(sum);
                            $("#info-bar").removeClass("enable").addClass("disable");

                            $(".button").removeClass("disable");
                            $("span").removeClass("visited");
                            sum = 0;
                        });
                    }
                }
            });
        }
    });

    // reset the calculator when the menu shrink
    $("#at-plus-container").mouseleave(function() {
        $("p").html("");
        $("span").html("");
        $("span").removeClass("redSpot");
        $("span").removeClass("visited");
        $(".button").removeClass("disable");
        $("#info-bar").removeClass("enable").addClass("disable");
        sum = 0;
        btnClicked = 0;
    });
});