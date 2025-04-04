const elements = ['Fire', 'Water', 'Earth', 'Air'];
const counters = {
    Fire: ['Water', 'Air'],
    Water: ['Earth', 'Fire'],
    Earth: ['Air', 'Water'],
    Air: ['Fire', 'Earth'],
};

let randomElement = '';
let userChoice = '';
let gameStarted = false;
let randomElementInterval;
let countdown = 15; // 30 seconds countdown
let timerInterval;


function startGame() {
    // Hide the start button and show the game board
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    // Set game state to started
    gameStarted = true;

    // Start the random element generator with an interval
    randomElementInterval = setInterval(randomizeElement, 3000); // Change element every 3 seconds

    // Start the countdown after a 3-second delay
    countdown = 15;
    document.getElementById('timer').innerText = `Time Remaining: ${countdown}s`; // Initialize the timer display

    // Delay starting the countdown for 3 seconds
    setTimeout(() => {
        // Start updating the timer every second after the 3-second delay
        timerInterval = setInterval(updateTimer, 1000); 
    }, 3000); // 3 seconds delay before starting the timer
}

function updateTimer() {
    if (countdown <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        evaluateGame(); // Automatically evaluate the game when time is up
        document.getElementById('result').innerText = "Time's up!" ;
    } else {
        countdown--;
        document.getElementById('timer').innerText = `Time Remaining: ${countdown}s`; // Update the timer display
    }
}

function randomizeElement() {
    if (!gameStarted) return;

    // Select a random element
    const randomIndex = Math.floor(Math.random() * elements.length);
    randomElement = elements[randomIndex];

    // Find the corresponding image element for the random element
    const randomElementCard = document.querySelector(`.element-card[data-element="${randomElement}"]`);
    const imgSrc = randomElementCard.querySelector('img').src;

    // Update the random element in the DOM with the image and name
    const randomElementDisplay = document.getElementById('random-element');
    randomElementDisplay.querySelector('img').src = imgSrc; // Use the image source from the card
    randomElementDisplay.querySelector('p').innerText = randomElement;
}

function handleUserChoice(element) {
    if (!gameStarted) return;

    userChoice = element;
    evaluateGame();
}

function evaluateGame() {
    const resultElement = document.getElementById('result');
    
    // Stop the random element interval after user makes a choice
    clearInterval(randomElementInterval);
    clearInterval(timerInterval); // Stop the countdown timer
    
    // Determine the result based on the user's choice and the random element
    if (userChoice === randomElement) {
        resultElement.innerText = "It's a draw!";
    } else if (counters[userChoice].includes(randomElement)) {
        resultElement.innerText = `You Win! ${userChoice} counters ${randomElement}`;
    } else {
        resultElement.innerText = `You Lose! ${randomElement} counters ${userChoice}`;
    }

    // Disable the game after one choice
    gameStarted = false;


    // Allow the player to play again by resetting the game
    setTimeout(() => {
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('result').innerText = '';
        document.getElementById('timer').innerText = 'Time Remaining: 30s'; // Reset timer display
    }, 2000); // Show "Start Game" button after 2 seconds
}
