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

    randomNumber1El.textContent = "?";
    randomNumber2El.textContent = "?";

    player2Container.classList.add("inactive");
    player1Container.classList.remove("inactive");
}

startGame();
function generateRandomNumber() {
    return Math.floor(Math.random() * 101);
}

function switchPlayer() {
    player1Container.classList.toggle("inactive");
    player2Container.classList.toggle("inactive");
}
function handleWin(player, container) {
    playing = false;
    container.classList.add("winner");
}
function handleGuess(
    container,
    currentPlayer,
    input,
    button,
    status,
    guessText,
) {
    if (playing) {
        const guess = Number(input.value);
        if (!guess || guess < 0 || guess > 100) {
            button.style.background = "red";
            setTimeout(() => {
                button.style.background = "white";
            }, 500);
            return;
        }

        if (guess === randomNumbers[currentPlayer]) {
            handleWin(currentPlayer, container);
            return;
        } else {
            guesses[currentPlayer]++;
            guessText.textContent = guesses[currentPlayer];
            if (guess > randomNumbers[currentPlayer]) {
                status.textContent = "Too High!";
            } else if (guess < randomNumbers[currentPlayer]) {
                status.textContent = "Too Low!";
            }
            currentPlayer = currentPlayer === 0 ? 1 : 0;
            switchPlayer();
        }
    }
}

guess1Button.addEventListener("click", function () {
    handleGuess(
        player1Container,
        currentPlayer,
        number1Input,
        guess1Button,
        statusText1,
        guessesText1,
    );
});

guess2Button.addEventListener("click", function () {
    handleGuess(
        player1Container,
        currentPlayer,
        number2Input,
        guess2Button,
        statusText2,
        guessesText2,
    );
});
