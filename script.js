'use strict';

// Selecting Element
let inputEl = document.getElementById('nu-input');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

//  starting Condition
const init = function() {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    inputEl.value = '';
    inputEl.autofocus;
    score1El.textContent = 0;
    score0El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0Name.textContent = 'Player 1';
    player1Name.textContent = 'Player 2';
};
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (inputEl.value === '') {
        inputEl.classList.toggle('require-input');
    } else {
        if (playing) {
            //******? 1. Generating a random dice roll ******

            const dice = Math.trunc(Math.random() * 6) + 1;

            //*******? 2. Display dice *************
            diceEl.classList.remove('hidden');
            diceEl.src = `dice-${dice}.png`;

            //*******? 3. check for roll 1:  *****
            if (dice !== 1) {
                //? *** Add dice to current score *****
                // currentScore = currentScore + dice;
                currentScore += dice;
                document.getElementById(
                    `current--${activePlayer}`
                ).textContent = currentScore;
                // current0El.textContent = currentScore; // change later
            } else {
                //? *** if true switch to next player *** // for repating this code we use function
                switchPlayer();
            }
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing) {
        // 1. Add current score to active player
        let activeScore = (score[activePlayer] += currentScore);
        //** it mean like this */
        // score[1] = score[1] + currentScore;

        document.getElementById(`score--${activePlayer}`).textContent = activeScore; // Or activePlayer;

        // 2. Check if player score is >= 100
        let finalVal = document.querySelector('.final-score').value;
        let winningScore;
        // if (finalVal) {
        //     winningScore = finalVal;
        // } else {
        //     winningScore = 100;
        // }
        finalVal ? (winningScore = finalVal) : (winningScore = 100);

        if (activeScore >= winningScore) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document.getElementById(`name--${activePlayer}`).textContent =
                '🎉!Winner';
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        }
        // 3. Switch the next player
        else switchPlayer();
    }
});

/*************************** Button New Game Functionality *********************/

btnNew.addEventListener('click', init);