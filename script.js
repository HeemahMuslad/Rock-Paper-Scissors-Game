let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
document.body.addEventListener("keydown", (event) => {
  console.log("keydown");
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoplay();
  } else if (event.key === "t") {
    autoplay();
  } else if (event.key === "Backspace") {
    resetScore();
  }
});

const rockElement = document.querySelector(".js-rock-button");
rockElement.addEventListener("click", () => {
  playGame("rock");
});
const paperElement = document.querySelector(".js-paper-button");
paperElement.addEventListener("click", () => {
  playGame("paper");
});
const scissorsElement = document.querySelector(".js-scissors-button");
scissorsElement.addEventListener("click", () => {
  playGame("scissors");
});
const resetScoreElement = document.querySelector(".js-resetScore-button");
resetScoreElement.addEventListener("click", () => {
  resetScore();
});
const autoplayElement = document.querySelector(".js-autoplay-button");
autoplayElement.addEventListener("click", autoplay);

let autoPlaying = false;
let intervalId;

function autoplay() {
  if (!autoPlaying) {
    intervalId = setInterval(() => {
      document.querySelector(".js-autoplay-button").innerHTML = "Stop Playing";
      let playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    autoPlaying = true;
  } else {
    document.querySelector(".js-autoplay-button").innerHTML = "AutoPlay";

    clearInterval(intervalId);
    autoPlaying = false;
  }
}
function resetScore() {
  const message = document.querySelector(".js-confirmation-message");
  message.innerHTML =
    "Are you sure you want to reset the score?  <button class='js-yes-button message-button'>Yes</button> <button class='js-no-button message-button'>No</button>";
  document.querySelector(".js-yes-button").addEventListener("click", () => {
    (score.wins = 0), (score.losses = 0), (score.ties = 0);
    localStorage.removeItem("score");
    scoreElement();
    message.innerHTML = "";
  });
  document.querySelector(".js-no-button").addEventListener("click", () => {
    message.innerHTML = "";
  });
}
function pickComputerMove() {
  let computerMove = "";
  randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber <= 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
function playGame(playerMove) {
  let computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose";
    } else if (computerMove === "paper") {
      result = "You win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You lose";
    } else if (computerMove === "scissors") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));
  scoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-move").innerHTML = `You 
  <img src="./images/${playerMove}-emoji.png" alt="" />  
  <img src="./images/${computerMove}-emoji.png" alt="" /> Computer `;
}

function scoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.`;
}
