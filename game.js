let buttonColors = ["red","yellow","blue","green"];
let gamePattern = [];
let userClickedPattern = [];
var gameStart = 0;
var progress = 0;

$(document).on("keydown", function (){
  if (gameStart === 0){
    $("#level-title").css("color","#FEF2BF");
    nextSequence();
    gameStart++;
  }
});

$(".btn").on("click", function(event){
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer();
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
});

function animatePress(color){
  $("#" + color).addClass("pressed");
  setTimeout(function (){
    $("#" + color).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  $("#level-title").text("Level " + (gamePattern.length+1));
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  console.log(gamePattern);
}

function playSound(color){
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function checkAnswer(){
  if (userClickedPattern[progress] != gamePattern[progress]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){$("body").removeClass("game-over");},200);
    $("#level-title").html("GAME OVER<br>Press A Key to Restart");
    progress = 0;
    gameStart = 0;
    gamePattern = [];
    userClickedPattern = [];
  }else if (userClickedPattern.length == gamePattern.length){
    setTimeout(nextSequence, 1000);
    progress = 0;
    userClickedPattern = [];
  }else progress++;
}
