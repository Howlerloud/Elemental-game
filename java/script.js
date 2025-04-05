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
let countdown = 15;
let timerInterval;
let selectedElements = []; // Store selected elements
let correctSelections = 0; // Count correct selections

function startGame() {
    // Hide the start button and show the game board
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    // Set game state to started
    gameStarted = true;

    // Start the random element generator with an interval
    randomElementInterval = setInterval(randomizeElement, 3000);

    // Start the countdown after a 3-second delay
    countdown = 15;
    document.getElementById('timer').innerText = `Time Remaining: ${countdown}s`;

    // Delay starting the countdown for 3 seconds
    setTimeout(() => {
        // Start updating the timer every second after the 3-second delay
        timerInterval = setInterval(updateTimer, 1000);
    }, 3000);
}

function updateTimer() {
    if (countdown <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        evaluateGame(); // Automatically evaluate the game when time is up
        document.getElementById('result').innerText = "Time's up!";
    } else {
        countdown--;
        document.getElementById('timer').innerText = `Time Remaining: ${countdown}s`;
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
    randomElementDisplay.querySelector('img').src = imgSrc;
    randomElementDisplay.querySelector('p').innerText = randomElement;
}

function handleUserChoice(element) {
    if (!gameStarted || selectedElements.includes(element)) return; // Prevent re-selection

    // Flip the card and disable it
    const card = document.querySelector(`.element-card[data-element="${element}"]`);
    card.style.transform = "rotateY(180deg)"; // Flip card
    card.style.pointerEvents = "none"; // Disable further interaction

    // Store selected element
    selectedElements.push(element);

    // Check if the user's choice is correct
    if (counters[element].includes(randomElement)) {
        correctSelections++;
        defeatRandomElement(); // "Defeat" the random element if the user selects correctly
    }

    // If all elements are selected correctly, evaluate the game
    if (correctSelections === 4) {
        setTimeout(evaluateGame, 500); // Delay evaluation until all selections are made
    }
}

function defeatRandomElement() {
    // Once the user selects a correct element, the random element is "defeated"
    const randomElementDisplay = document.getElementById('random-element');
    randomElementDisplay.querySelector('img').src = "assets/defeated.webp"; // Replace with a "defeated" image
    randomElementDisplay.querySelector('p').innerText = "Defeated!";
    randomElement = ''; // Clear the random element once defeated
}

function evaluateGame() {
    const resultElement = document.getElementById('result');

    // Stop the random element interval after user makes a choice
    clearInterval(randomElementInterval);
    clearInterval(timerInterval); // Stop the countdown timer

    // Determine the result based on the user's choices and the random element
    if (correctSelections === 4) {
        resultElement.innerText = "You Win! You selected all elements correctly!";
    } else {
        resultElement.innerText = `You Lose! Some selections were incorrect.`;
    }

    // Disable the game after one choice
    gameStarted = false;

    // Allow the player to play again by resetting the game
    setTimeout(() => {
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('result').innerText = '';
        document.getElementById('timer').innerText = 'Time Remaining: 30s'; // Reset timer display
        resetGame(); // Reset the game state
    }, 2000);
}

function resetGame() {
    // Reset selected elements and correct selections
    selectedElements = [];
    correctSelections = 0;

    // Reset all cards to their initial state
    const cards = document.querySelectorAll('.element-card');
    cards.forEach(card => {
        card.style.transform = "rotateY(0deg)"; // Reset flip
        card.style.pointerEvents = "auto"; // Re-enable card interactions
    });

    // Reset random element display
    const randomElementDisplay = document.getElementById('random-element');
    randomElementDisplay.querySelector('img').src = "assets/Bomb.webp"; // Reset to the original random element image
    randomElementDisplay.querySelector('p').innerText = ""; // Reset text
}