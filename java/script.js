/*jslint browser */
const elementals = ["Fire", "Water", "Earth", "Wind", "Ice", "Thunder"];
const counters = {
    Earth: ["Thunder"],
    Fire: ["Ice"],
    Ice: ["Wind"],
    Thunder: ["Water"],
    Water: ["Fire"],
    Wind: ["Earth"]
};

let randomElement = "";  // array to store random element
let userChoice = ""; //
let gameStart = false; // if the game is running or not
let selectElement;
let countdown = 30; // Countdown timer.
let timerInterval;
let selectedElements = []; // Store selected elements.
let correctSelections = 0; // Count correct selections.
let defeatedCount = 0; // Track the number of defeated random elements.
let defeatedElements = []; // Track the defeated random elements.

function difficulty() {
    // Hide the start button, counters and displays the difficulty choices.
    document.getElementById("start-button").style.display = "none";
    document.getElementById("element-counters").style.display = "none";
    document.getElementById("easy").style.display = "inline-block";
    document.getElementById("medium").style.display = "inline-block";
    document.getElementById("hard").style.display = "inline-block";
}

function startGameEasy() {
    // Hide the difficulty choices and starts the game.
    document.getElementById("game-board").style.display = "block";
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";

    // Set game state to started
    gameStart = true;

    // Start the random monster generator with an interval of 3 seconds
    selectElement = setInterval(randomizeElement, 3000);

    // 60 Second countdown timer
    countdown = 60;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countdown}s`;

    // Delay starting the countdown for 3 seconds when the game board opens
    setTimeout(function() {
        timerInterval = setInterval(updateTimer, 1000);
    }, 3000);
}

function startGameMedium() {
    // Hide the difficulty choices and starts the game.
    document.getElementById("game-board").style.display = "block";

    //Hide difficulty buttons
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";

    // Set game state to started
    gameStart = true;

    // Start the random monster generator with an interval of 3 seconds
    selectElement = setInterval(randomizeElement, 3000);

    // 45 Second countdown timer
    countdown = 45;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countdown}s`;

    // Delay starting the countdown for 3 seconds when the game board opens
    setTimeout(function() {
        timerInterval = setInterval(updateTimer, 1000);
    }, 3000);
}

function startGameHard() {
    // Hide the difficulty choices and starts the game.
    document.getElementById("game-board").style.display = "block";

    //Hide difficulty buttons
    document.getElementById("easy").style.display = "none";
    document.getElementById("medium").style.display = "none";
    document.getElementById("hard").style.display = "none";

    // Set game state to started
    gameStart = true;

    // Start the random monster generator with an interval of 2 seconds
    selectElement = setInterval(randomizeElement, 2000);

    // 30 Second countdown timer
    countdown = 30;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countdown}s`;

    // Delay starting the countdown for 3 seconds when the game board opens
    setTimeout(function() {
        timerInterval = setInterval(updateTimer, 1000);
    }, 3000);
}

function updateTimer() {
    if (countdown <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        evaluateGame(); // Evaluate the game when time is up
        document.getElementById("result").innerText =
            "Time's up!";
    } else {
        countdown = countdown - 1;
        Math.floor(countdown);
        document.getElementById("timer").innerText =
            `Time Remaining: ${countdown}s`;
    }
}

function randomizeElement() {

    // Filter out defeated elements from the elements list
    const availableElements = elementals.filter((element) =>
        !defeatedElements.includes(element));

    // If all elements are defeated the game ends
    if (availableElements.length === 0) {
        evaluateGame(true);
        return;
    }

    // Generate a random element from the list of elements
    const randomIndex = Math.floor(Math.random() * availableElements.length);
    randomElement = availableElements[randomIndex];

    // Find the corresponding image for the random element chosen
    const randomElementCard =
        document.querySelector(`.element-card[data-element=
            "${randomElement}"]`);
    const imgSrc =
        randomElementCard.querySelector("img").src;

    // Update the random element card
    const randomElementDisplay =
        document.getElementById("random-element");
    //updates the random elements image
    randomElementDisplay.querySelector("img").src =
        imgSrc;
    // Update the random elements name
    randomElementDisplay.querySelector("p").innerText =
        randomElement;
}

function handleUserChoice(element) {
    // Removes the chosen element card from the list
    if (!gameStart ||
        selectedElements.includes(element)) { return; }
    // Flips the card and disables it from play
    const card =
        document.querySelector(`.element-card[data-element="${element}"]`);
    // Rotates card so its hidden
    card.style.transform = "rotateY(90deg) rotateX(90deg)";
    card.style.pointerEvents = "none"; // Disable further interaction

    // Store selected element into the element array
    selectedElements.push(element);

    // Check if the player has chosen correctly
    if (counters[element].includes(randomElement)) {
        //Adds 1 every time a correct element is chosen
        correctSelections = correctSelections + 1;
        // "Defeat" the random element if the user selects correctly
        defeatRandomMonster();
        // Increase the defeated count by 1
        defeatedCount = defeatedCount + 1;
        // Add the defeated monster to the defeatedElements list
        defeatedElements.push(randomElement);
        // Evaluate the game
        if (defeatedCount === 6) {
            // Delay evaluation until all selections are made
            setTimeout(() => evaluateGame(true), 500);
        }
    } else {
        // If the user chooses incorrectly, end the game
        evaluateGame(false); // Pass `false` to indicate defeat
    }
}

function defeatRandomMonster() {
    // After a correct selection, mark the random element as defeated
    // and prevent it from appearing again in future randomizations
    defeatedElements.push(randomElement);
}

function evaluateGame(Win) {
    const resultElement =
        document.getElementById("result");

    // Stop the random element interval after user makes a choice
    clearInterval(selectElement);

    // Stop the countdown timer
    clearInterval(timerInterval);
    // Display the result based on whether the user won or lost
    if (Win) {
        resultElement.innerText =
            "You Win! You defeated all the Monsters in the dungeon!";
    } else {
        resultElement.innerText =
            "You have been defeated by the Monsters!";
    }

    // Disable the game
    gameStart = false;

    // Disable further interaction with elements
    const cards = document.querySelectorAll(".element-card");

    // Disable further interaction
    cards.forEach(function(card) {
        card.style.pointerEvents = "none";
    });

    // Resets the game back to the start menu
    setTimeout(function() {
        document.getElementById("start-button").style.display =
            "inline-block";
        document.getElementById("element-counters").style.display =
            "inline-block";
        document.getElementById("game-board").style.display =
            "none";
        document.getElementById("result").innerText =
            "";
        document.getElementById("timer").innerText =
            ""; // Reset timer display
        resetGame(); // Reset the game
    }, 3000);
}

function resetGame() {
    // Reset selected elements and correct selections
    selectedElements = [];
    correctSelections = 0;
    defeatedCount = 0; // Reset defeated elements count
    defeatedElements = []; // Reset defeated elements list

    // Reset all cards to their initial state
    const cards = document.querySelectorAll(".element-card");
    cards.forEach(function(card) {
        card.style.transform =
            "rotateY(0deg)"; // Reset flip
        card.style.pointerEvents =
            "auto"; // Re-enable card interactions
    });

    // Reset random element display
    const randomElementDisplay =
        document.getElementById("random-element");
    randomElementDisplay.querySelector("img").src =
        "assets/Bomb.webp"; // Reset to the original random element image
    randomElementDisplay.querySelector("p").innerText = ""; // Reset text
}