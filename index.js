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


let randomNumber1;
let randomNumber2;
restartButton.addEventListener("click", startGame);

function startGame() {
    randomNumber1 = generateRandomNumber()
    randomNumber2 = generateRandomNumber()
    console.log(randomNumber1, randomNumber2)
    switchPlayer(player1Container, player2Container, guess2Button, number2Input)
    number1Input.value = "";
    number2Input.value = "";
    randomNumber1El.textContent = "?"
    randomNumber2El.textContent = "?"
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 101);
}

function switchPlayer(activePlayer, inactivePlayer, activeGuess, activeInput) {
    activePlayer.classList.remove("inactive");
    inactivePlayer.classList.add("inactive");

    activeGuess.disabled = true;
    activeInput.disabled = true;

    inactivePlayer.querySelector("input").disabled = false;
    inactivePlayer.querySelector("button").disabled = false;
}

guess1Button.addEventListener("click", function() {
    const input = Number(number1Input.value)
    if (!input || input < 0 || input > 100) {
        guess1Button.style.background = "red"
        setTimeout(() => {
            guess1Button.style.background = "white"
        }, 500);
        return;
    }
    if (input === randomNumber1) {
        handleWin(1, player1Container, guess1Button, number1Input)
    } else {
        if (input > randomNumber1) {
            statusText1.textContent = "Too High!"
        } else if (input < randomNumber1){
            statusText1.textContent = "Too Low!"
        }
        switchPlayer(player2Container, player1Container, guess1Button, number1Input)
    }
    console.log(input)
})

guess2Button.addEventListener("click", function() {
    const input = Number(number2Input.value)
    if (!input || input < 0 || input > 100) {
        guess2Button.style.background = "red"
        setTimeout(() => {
            guess2Button.style.background = "white"
        }, 500);
        return;
    }
    if (input === randomNumber2) {
        handleWin(1, player2Container, guess2Button, number2Input)
    } else {
        if (input > randomNumber2) {
            statusText2.textContent = "Too High!"
        } else if (input < randomNumber2){
            statusText2.textContent = "Too Low!"
        }
        switchPlayer(player1Container, player2Container, guess2Button, number2Input)
    }
    console.log(input)
})