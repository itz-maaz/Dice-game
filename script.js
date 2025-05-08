'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currntPlayer0 = document.getElementById('current--0');
const currntPlayer1 = document.getElementById('current--1');

const btnDice = document.querySelector('.dice');
const newDice = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, curentScore, activePlayer, playing;
const initialValues = function () {
  scores = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  currntPlayer0.textContent = 0;
  currntPlayer1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnDice.classList.add('hidden');
};
initialValues();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//button for rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice

    btnDice.classList.remove('hidden');
    btnDice.src = `dice-${dice}.png`;

    //add the score if dice is not 1
    if (dice !== 1) {
      curentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    }
    //chnage the player and reset the score if dice is 1
    else {
      switchPlayer();
    }
  }
});

//button for holding the current score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      btnDice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//Reseting the game or try again
newDice.addEventListener('click', initialValues);
