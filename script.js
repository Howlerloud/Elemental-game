const elements = ['Fire', 'Water', 'Earth', 'Air', 'Light', 'Dark', 'Electricity', 'Ice'];

const counters = {
    Fire: ['Water', 'Air'],
    Water: ['Earth', 'Electricity'],
    Earth: ['Fire', 'Light'],
    Air: ['Light', 'Ice'],
    Light: ['Dark', 'Fire'],
    Dark: ['Water', 'Earth'],
    Electricity: ['Air', 'Ice'],
    Ice: ['Dark', 'Earth']
};

let randomElement = '';
let userChoice = '';
let gameStarted = false;
let randomElementInterval;

function startGame() {
    // Hide the start button and show the game elements
    document.getElementById('start-btn').style.display = 'none';
    document.querySelector('.elements').style.display = 'flex';
    
    // Start the random element generator and game logic
    gameStarted = true;
    randomizeElement();
    randomElementInterval = setInterval(randomizeElement, 3000);
}

function randomizeElement() {
    if (!gameStarted) return;

    // Select a random element
    const randomIndex = Math.floor(Math.random() * elements.length);
    randomElement = elements[randomIndex];
    
    // Update the random element in the DOM
    document.getElementById('random-element').innerText = randomElement;
}

// This function runs when the user makes a choice
function userChoice(element) {
    if (!gameStarted) return; // Prevent choosing elements before starting the game

    userChoice = element;
    evaluateGame();
}

// Evaluates the game outcome based on user's and random element choices
function evaluateGame() {
    if (userChoice === randomElement) {
        document.getElementById('result').innerText = "It's a draw!";
    } else if (counters[userChoice].includes(randomElement)) {
        document.getElementById('result').innerText = `You Win! ${userChoice} counters ${randomElement}`;
    } else {
        document.getElementById('result').innerText = `You Lose! ${randomElement} counters ${userChoice}`;
    }
}

// Stop the game (optional feature if you want to add an end game button later)
function stopGame() {
    gameStarted = false;
    clearInterval(randomElementInterval);
    document.querySelector('.elements').style.display = 'none';
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('random-element').innerText = '-';
    document.getElementById('result').innerText = '';
}