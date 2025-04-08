const elements = ['Fire', 'Water', 'Earth', 'Wind','Ice','Thunder'];
const counters = {
    Fire: ['Ice'],
    Ice: ['Wind'],
    Wind: ['Earth'],
    Earth: ['Thunder'],
    Thunder:['Water'],
    Water: ['Fire'],
};

let randomElement = '';
let userChoice = '';
let gameStarted = false;
let randomElementInterval;
let countdown = 30;
let timerInterval;
let selectedElements = []; // Store selected elements
let correctSelections = 0; // Count correct selections
let defeatedCount = 0; // Track the number of defeated random elements
let defeatedElements = []; // Track the defeated random elements

function startGame() {
    // Hide the start button, counters and show the game board
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('element-counters').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';

    // Set game state to started
    gameStarted = true;

    // Start the random element generator with an interval
    randomElementInterval = setInterval(randomizeElement, 3000);

    // Start the countdown after a 3-second delay
    countdown = 600;
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

    // Filter out defeated elements from the available elements
    const availableElements = elements.filter(element => !defeatedElements.includes(element));

    // If all elements are defeated, end the game
    if (availableElements.length === 0) {
        evaluateGame(true);
        return;
    }

    // Generate a random element from the available elements
    const randomIndex = Math.floor(Math.random() * availableElements.length);
    randomElement = availableElements[randomIndex];

    // Find the corresponding image for the random element
    const randomElementCard = document.querySelector(`.element-card[data-element="${randomElement}"]`);
    const imgSrc = randomElementCard.querySelector('img').src;

    // Update the random element in the display with the image and name
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
        defeatedCount++; // Increment the defeated count

        // Add the defeated element to the defeatedElements list
        defeatedElements.push(randomElement);

        // If all elements are selected correctly and defeated, evaluate the game
        if (defeatedCount === 6) {
            setTimeout(() => evaluateGame(true), 500); // Delay evaluation until all selections are made
        }
    } else {
        // If the user chooses incorrectly, end the game
        evaluateGame(false); // Pass `false` to indicate defeat
    }
}

function defeatRandomElement() {
    // After a correct selection, mark the random element as defeated
    // and prevent it from appearing again in future randomizations
    defeatedElements.push(randomElement);
}

function evaluateGame(isWin) {
    const resultElement = document.getElementById('result');

    // Stop the random element interval after user makes a choice
    clearInterval(randomElementInterval);
    clearInterval(timerInterval); // Stop the countdown timer

    // Display the result based on whether the user won or lost
    if (isWin) {
        resultElement.innerText = "You Win! You defeated all the random elements!";
    } else {
        resultElement.innerText = "You have been defeated by the Monsters!";
    }

    // Disable the game after one choice
    gameStarted = false;

    // Disable further interaction with elements
    const cards = document.querySelectorAll('.element-card');
    cards.forEach(card => {
        card.style.pointerEvents = "none"; // Disable further interaction
    });

    // Allow the player to play again by resetting the game
    setTimeout(() => {
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('result').innerText = '';
        document.getElementById('timer').innerText = 'Time Remaining: 20s'; // Reset timer display
        resetGame(); // Reset the game state
    }, 2000);
}

function resetGame() {
    // Reset selected elements and correct selections
    selectedElements = [];
    correctSelections = 0;
    defeatedCount = 0; // Reset defeated elements count
    defeatedElements = []; // Reset defeated elements list

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