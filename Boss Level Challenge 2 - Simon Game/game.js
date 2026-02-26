var userClickedPattern = [];
var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;


// -------------------- START GAME --------------------

$("body").keypress(function () {

    if (!started) {

        level = 0;
        gamePattern = [];
        userClickedPattern = [];

        newSequence();
        started = true;
    }
});


// -------------------- NEW SEQUENCE --------------------

function newSequence() {

    userClickedPattern = [];   // reset user clicks every level

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


// -------------------- BUTTON CLICK --------------------

$(".btn").on("click", function handler() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    $("#" + userChosenColour).fadeOut(100).fadeIn(100);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


// -------------------- CHECK ANSWER --------------------

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                newSequence();
            }, 1000);
        }

    } else {

        playSound("wrong");

        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


// -------------------- RESET GAME --------------------

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// -------------------- SOUND --------------------

function playSound(name) {
    var gameSound = new Audio("sounds/" + name + ".mp3");
    gameSound.play();
}


// -------------------- ANIMATION --------------------

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}