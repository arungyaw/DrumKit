
var buttonDrums = ["tom-1", "tom-2", "tom-3", "tom-4","crash","kick-bass","snare"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("p,ol,li").text("");
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenDrum = $(this).attr("id");
  userClickedPattern.push(userChosenDrum);

  playSound(userChosenDrum);
  animatePress(userChosenDrum);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("👹Game Over!!");
      $("ol").text("Press Any Key to Restart").css("text-align","center");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 7);
  var randomChosenDrum = buttonDrums[randomNumber];
  gamePattern.push(randomChosenDrum);

  $("#" + randomChosenDrum).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenDrum);
}

function animatePress(currentDrum) {
  $("#" + currentDrum).addClass("pressed");
  setTimeout(function () {
    $("#" + currentDrum).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
