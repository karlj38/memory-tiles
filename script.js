var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];
var randomColor = "";
var level = 0;

function startGame() {
  if (!level) {
    nextSequence();
  }
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  animate(randomColor);
}

function animate(name) {
  $("#" + name).fadeOut(200);
  $("#" + name).fadeIn(200);
  playSound(name);
}

function press(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(answer) {
  if (userPattern[answer] == gamePattern[answer]) {
    if (userPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userPattern = [];
      }, 2000);
    }
  } else {
    gameover();
  }
}

function gameover() {
  playSound("wrong");
  $("h1").text("Game Over, Press A Key to Restart");
  level = 0;
  gamePattern = [];
  userPattern = [];
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

$(document).keydown(startGame);

$(".btn").click(function (event) {
  if (level) {
    var userColor = event.target.id;
    userPattern.push(userColor);
    animate(userColor);
    press(userColor);
    checkAnswer(userPattern.length - 1);
  }
});
