const startButton = document.querySelector("#start-game");
const spinner = document.querySelector("#spinner");
const plyr1Cnt = document.querySelector("#player1Cnt");
const plyr2Cnt = document.querySelector("#player2Cnt");
let lastTime = undefined;
let requestAnimationFrameId;
let hasGameStarted = false;

const rotateSpinner = (timeStamp) => {
  if (lastTime === undefined) {
    lastTime = timeStamp;
  }
  let degRotate = (timeStamp - lastTime) * 5;
  degRotate %= 360;
  spinner.style.transform = `rotate(${degRotate}deg)`;
  // lastTime = timeStamp;
  requestAnimationFrameId = requestAnimationFrame(rotateSpinner);
};

const random = (min = 5, max = 10) => {
  return Math.random() * (max - min) + min;
};

const startNewRound = () => {
  startButton.textContent = "Next round";
  hasGameStarted = false;
};

const resetGame = () => {
  startButton.textContent = "Start Game";
  hasGameStarted = false;
  plyr1Cnt.textContent = "0";
  plyr2Cnt.textContent = "0";
};

const stopSpinner = () => {
  cancelAnimationFrame(requestAnimationFrameId);
  spinner.style.display = "none";
  startButton.textContent = "Go fast!!";
  startButton.style.display = "";

  document.addEventListener("keydown", function playerInputHandler(event) {
    let pressCorrectly = false;
    let hasWon = false;
    if (event.key === "a") {
      plyr1Cnt.textContent = `${Number(plyr1Cnt.textContent) + 1}`;
      console.log(plyr1Cnt);
      if (parseFloat(plyr1Cnt.textContent) >= 5) {
        startButton.textContent = "Player 1 won the game!!";
        hasWon = true;
      } else {
        startButton.textContent = "Player 1 won this round!!";
      }
      pressCorrectly = true;
    } else if (event.key === "l") {
      plyr2Cnt.textContent = Number(plyr2Cnt.textContent) + 1;
      if (parseFloat(plyr2Cnt.textContent) >= 5) {
        startButton.textContent = "Player 2 won the game!!";
        hasWon = true;
      } else {
        startButton.textContent = "Player 2 won this round!!";
      }

      pressCorrectly = true;
    }

    if (pressCorrectly && hasWon) {
      document.removeEventListener("keydown", playerInputHandler);
      setTimeout(resetGame, 5000);
    } else if (pressCorrectly) {
      document.removeEventListener("keydown", playerInputHandler);
      setTimeout(startNewRound, 1000);
    }
  });
};
startButton.addEventListener("click", function startGame(event) {
  if (!hasGameStarted) {
    hasGameStarted = true;
    startButton.style.display = "none";
    spinner.style.display = "block";
    rotateSpinner();
    const randomSecs = random(2, 4);
    setTimeout(() => {
      stopSpinner();
    }, randomSecs * 1000);
  }
});
