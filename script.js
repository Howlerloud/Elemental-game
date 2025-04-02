const elements = ['Fire', 'Water', 'Earth', 'Air'];
const counters = {
    Fire: ['Water', 'Air'],
    Water: ['Earth', 'Fire'],
    Earth: ['Air', 'Water'],
    Air: ['Fire', 'Earth']
};

let randomElement = '';
let userChoice = '';
let gameStarted = false;
let randomElementInterval;

function startGame() {
    // Hide the start button and show the game board
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    // Set game state to started
    gameStarted = true;

    // Start the random element generator
    randomizeElement();
}

function randomizeElement() {
    if (!gameStarted) return;

    // Select a random element
    const randomIndex = Math.floor(Math.random() * elements.length);
    randomElement = elements[randomIndex];

    // Update the random element in the DOM
    const randomElementCard = document.getElementById('random-element');
    randomElementCard.querySelector('img').src = `${randomElement.toLowerCase()}.png`; // Ensure your image names are lowercase
    randomElementCard.querySelector('p').innerText = randomElement;
}

function handleUserChoice(element) {
    if (!gameStarted) return;

    userChoice = element;
    evaluateGame();
}

function evaluateGame() {
    const resultElement = document.getElementById('result');
    
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
}