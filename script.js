"use strict";
// ./images/dice-1.svg
const score0El = document.querySelector("#score-0");
const score1El = document.getElementById("score-1");
const cureent0El = document.getElementById("current-0");
const cureent1El = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const player0Color = document.querySelector(".player-0");
const player1Color = document.querySelector(".player-1");
const status1 = document.querySelector(".status");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Player game switch
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // color change player theam
  player0Color.classList.toggle("player-active");
  player1Color.classList.toggle("player-active");
};

// Reset game function
const ResetData = () => {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  cureent0El.textContent = 0;
  cureent1El.textContent = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  status1.textContent = "";
  player0Color.classList.toggle("player-active");
  player1Color.classList.toggle("player-active");
};

// rolling
btnRoll.addEventListener("click", () => {
  const dice = Math.floor(Math.random() * 5) + 1;
  //display dice
  diceEl.classList.remove("hidden");
  diceEl.src = `./images/dice-${dice}.svg`;

  // check the roll
  if (dice != 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current-${activePlayer}`).textContent =
      currentScore;
  } else {
    // Next player turn
    switchPlayer();
  }
});

btnHold.addEventListener("click", () => {
  // Add current score to active player score
  scores[activePlayer] += currentScore;
  document.getElementById(`score-${activePlayer}`).textContent =
    scores[activePlayer];

  //IF PLAYER SCORE 100 THEN WINER
  if (scores[activePlayer] >= 20) {
    status1.textContent = `Player ${activePlayer} Win !🏆`;
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else {
    // switch to the nexxt player
    switchPlayer();
  }
});

btnNew.addEventListener("click", ResetData);
