"use strict";

// Player 1
const player1Container = document.querySelector(".player1");
const randomNumber1El = document.getElementById("randomNumber1");
const number1Input = document.getElementById("number1");
const guess1Button = document.getElementById("guess1");
const statusText1 = document.getElementById("statusText1");
const guessesText1 = document.getElementById("guessesText1");

// Player 2
const player2Container = document.querySelector(".player2");
const randomNumber2El = document.getElementById("randomNumber2");
const number2Input = document.getElementById("number2");
const guess2Button = document.getElementById("guess2");
const statusText2 = document.getElementById("statusText2");
const guessesText2 = document.getElementById("guessesText2");

const restartButton = document.getElementById("restartButton");

// Game Logic

let randomNumbers = [0, 0];
let guesses = [0, 0];

let currentPlayer = 0;

let playing = true;

restartButton.addEventListener("click", startGame);

function startGame() {
  randomNumbers[0] = generateRandomNumber();
  randomNumbers[1] = generateRandomNumber();

  guesses[0] = 0;
  guesses[1] = 0;

  number1Input.value = "";
  number2Input.value = "";

  statusText1.textContent = "?";
  statusText2.textContent = "?";

  guessesText1.textContent = 0;
  guessesText2.textContent = 0;

  randomNumber1El.textContent = "?";
  randomNumber2El.textContent = "?";

  player2Container.classList.add("inactive");
  player1Container.classList.remove("inactive");

  player2Container.classList.remove("winner");
  player1Container.classList.remove("winner");

  randomNumber1El.style.padding = "1rem 3rem";
  randomNumber2El.style.padding = "1rem 3rem";

  playing = true;
  currentPlayer = 0;

  console.log(randomNumbers);
}

startGame();

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function switchPlayer() {
  player1Container.classList.toggle("inactive");
  player2Container.classList.toggle("inactive");
}
function handleWin(container, status) {
  playing = false;
  container.classList.add("winner");
  status.textContent = "You got it!";
  currentPlayer === 0
    ? (statusText2.textContent = "Yikes!")
    : (statusText1.textContent = "Yikes!");

  currentPlayer === 0
    ? (randomNumber1El.style.padding = "1rem 6rem")
    : (randomNumber2El.style.padding = "1rem 6rem");
  randomNumber1El.textContent = randomNumbers[0];
  randomNumber2El.textContent = randomNumbers[1];
}
function handleGuess(container, input, button, status, guessText) {
  if (playing) {
    const guess = Number(input.value);
    if (!guess || guess < 0 || guess > 100) {
      button.style.background = "red";
      setTimeout(() => {
        button.style.background = "white";
      }, 500);
      return;
    }
    guesses[currentPlayer]++;
    guessText.textContent = guesses[currentPlayer];
    console.log(guess === randomNumbers[currentPlayer]);
    if (guess === randomNumbers[currentPlayer]) {
      handleWin(container, status);
      return;
    } else {
      if (guess > randomNumbers[currentPlayer]) {
        status.textContent = "Too High!";
        container.classList.add("tooHigh");
        setTimeout(() => {
          container.classList.remove("tooHigh");
        }, 1000);
      } else if (guess < randomNumbers[currentPlayer]) {
        status.textContent = "Too Low!";
        container.classList.add("tooLow");
        setTimeout(() => {
          container.classList.remove("tooLow");
        }, 1000);
      }
      currentPlayer = currentPlayer === 0 ? 1 : 0;
      switchPlayer();
    }
  }
}

guess1Button.addEventListener("click", function () {
  handleGuess(
    player1Container,
    number1Input,
    guess1Button,
    statusText1,
    guessesText1
  );
});

guess2Button.addEventListener("click", function () {
  handleGuess(
    player2Container,
    number2Input,
    guess2Button,
    statusText2,
    guessesText2
  );
});
