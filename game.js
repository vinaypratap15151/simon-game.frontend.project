let userclickedpattern = [];
let gamepattern = [];
let buttoncolors = ["red", "green", "blue", "yellow"];
var started = false;
var level = 0;

function sequence() {
    userclickedpattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomcolorchoosen = buttoncolors[randomNumber];
    $("#" + randomcolorchoosen).fadeIn(100).fadeOut(100).fadeIn(100);
    gamepattern.push(randomcolorchoosen);
    level++;
    playsound(randomcolorchoosen);
    $("h1").text("Level " + level);


}

$(".btn").click(function handler() {

    var userchoosencolor = $(this).attr("id");
    userclickedpattern.push(userchoosencolor);
    playsound(userchoosencolor);
    animatepress(userchoosencolor);
    checkanswer(userclickedpattern.length - 1);

});

$(document).keypress(function () {
    if (!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        sequence();
        started = true;
    }



});

function checkanswer(currentlevel) {
    if (userclickedpattern[currentlevel] === gamepattern[currentlevel]) {
        if (userclickedpattern.length === gamepattern.length) {
            setTimeout(function () {
                sequence();
            }, 1000);

        }
    }
    else {
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game over ,press a key to play again!");
        started = false;
        level = 0;
        gamepattern = [];

    }
}

function playsound(element) {
    var audio = new Audio(element + ".mp3");
    audio.play();
}
function animatepress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);

}