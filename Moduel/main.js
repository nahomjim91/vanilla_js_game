const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let canvasStyle = getComputedStyle(canvas);
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let fisherMan = document.querySelector(".fisherMan");
let body = document.body;
let startGame = document.querySelector(".StartGame");
let shouldStart = false;
// const startBtn = document.querySelector(".startBtn");
const gameOver = document.querySelector(".gameOver");
const pauseGame = document.querySelector(".pauseGame");
const resume = document.querySelector(".resume");
const scoreTxt = document.querySelector(".score");
const scorePauseGame = document.querySelector(".scorePauseGame");
const coinScore = document.querySelector(".coinScore");
const scoreOngoing = document.querySelector(".ScoreOngoing");
canvas.width = parseInt(canvasStyle.width, 10);
canvas.height = parseInt(canvasStyle.height, 10);
let muted = false;

let rightPressed = false;
let leftPressed = false;
let UpPressed = false;
let DownPressed = false;
let frame = 0;
let score = 0;
let gamespeed = 2;
let isGameOver = false;
let isGamePaused = false;

// get the left position of the fisherMan
function getFisherManPosition() {
  let computedStyle = window.getComputedStyle(fisherMan);
  let leftValue = computedStyle.getPropertyValue("left"); /// acessing the left property
  return parseInt(leftValue, 10);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (isGamePaused) {
    // checking that the game is not stoped
    pauseGame.style.display = "grid";
    scorePauseGame.textContent = "Score: " + score;
  }
  if (!isGameOver && !isGamePaused) {
    // only play is the game is not stopped or over
    isGameOver = obstaclesHandeler(canvas.width); // getting if there is no true --> maen there is no collition with the obstacl and fish

    if (!isGameOver) {
      isGameOver = updateUnderwaterShilp(); // even here also the spare that srowe to the fish by the UnderWaterShip
    }

    if (isGameOver) {
      gameOver.style.display = "flex";
      document.getElementById("background_audio").pause();
      muted = true; 
    }
    fish.update();
    fish.draw();
    if (frame % 120 === 0) {
      /// Every 120 frames the score increases
      scoreTxt.textContent = "Score: " + score;
      scoreOngoing.textContent = `Score: ${score}`;
      score++;
    }
    if (frame % 230 === 0) gamespeed += 0.1;

    frame++;
    if (frame % 200 === 0 && getFisherManPosition() > 0)
      fisherMan.style.display = "block";
    if (getFisherManPosition() < 0) {
      fisherMan.style.display = "none";
    }
    if (fisherMan.style.display === "none")
      fisherMan.style.left = `${canvas.width}px`;
    if (frame % 600 == 0) {
      // changing the Background from Day to night or vise verc
      if (sun.style.display === "block") {
        sun.style.display = "none";
        moon.style.display = "block";
        container.style.backgroundColor = "#1f2028";
        scoreOngoing.style.color = "#FFFFFF";
        coinScore.style.color = "#FFFFFF";
      } else {
        sun.style.display = "block";
        moon.style.display = "none";
        container.style.backgroundColor = "#F4D088";
        scoreOngoing.style.color = "#000";
        coinScore.style.color = "#000";
      }
    }

    shouldStart ? requestAnimationFrame(animate) : ""; // the requestAnimationFrame call the animate function in loop
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    document.getElementById('background_audio').pause() 
    isGamePaused = true;
  }
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key === "ArrowDown") {
    DownPressed = true;
  }
  if (e.key === "ArrowUp") {
    UpPressed = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key === "ArrowDown") {
    DownPressed = false;
  }
  if (e.key === "ArrowUp") {
    UpPressed = false;
  }
});

$(".startBtn").click(() => {
  shouldStart = true;
  if (shouldStart) {
    document.getElementById("background_audio").play();
    requestAnimationFrame(animate);
    startGame.style.display = "none";
    scoreOngoing.style.display = "block";
    console.log("start);");
  }
});

$(".newGame").click(() => window.location.reload());

$(".resume").click(() => {
 !muted?  document.getElementById("background_audio").play():''
  isGamePaused = false;
  requestAnimationFrame(animate);
  pauseGame.style.display = "none";
});
$(".backgroundSoundbtn").click(() => {
  if (!muted) {
    document.getElementById("background_audio").pause();
    muted = true;
    document.querySelector(
      ".backgroundSoundbtn"
    ).style.backgroundImage = `url(./images/volume-mute.png)`;
  } else {
    muted = false;
    document.getElementById("background_audio").play();
    document.querySelector(".backgroundSoundbtn").style.backgroundImage =
      "url(./images/volume.png)";
  }
});
