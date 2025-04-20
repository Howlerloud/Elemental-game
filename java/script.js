/*jslint browser */
/*global Swal */
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
let gameStart = false; // if the game is running or not
let selectElement;
let countDown = 30; // Countdown timer.
let timerInterval;
let selectedElements = []; // Store clicked on elements.
let correctSelections = 0; // Count correct selections.
let defeatedCount = 0; // Track the number of defeated random elements.
let defeatedElements = []; // Track the defeated random elements.
let score = 0; // counts wins

function difficulty() {
    // Hide the start button, counters and displays the difficulty choices.
    document.getElementById("start-button").style.display = "none";
    document.getElementById("element-counters").style.display = "none";
    document.getElementById("easy").style.display = "inline-block";
    document.getElementById("medium").style.display = "inline-block";
    document.getElementById("hard").style.display = "inline-block";
    document.getElementById("instructions").style.display = "none";
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

    // 60 Second countDown timer
    countDown = 60;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countDown}s`;

    // Delay starting the countDown for 3 seconds when the game board opens
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

    // 45 Second countDown timer
    countDown = 45;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countDown}s`;

    // Delay starting the countDown for 3 seconds when the game board opens
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

    // 30 Second countDown timer
    countDown = 30;
    document.getElementById("timer").innerText =
        `Time Remaining: ${countDown}s`;

    // Delay starting the countDown for 3 seconds when the game board opens
    setTimeout(function() {
        timerInterval = setInterval(updateTimer, 1000);
    }, 3000);
}

function updateTimer() {
    if (countDown <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        evaluateGame(); // Evaluate the game when time is up
        document.getElementById("result").innerText =
            "Time's up!";
    } else {
        countDown = countDown - 1;
        Math.floor(countDown);
        document.getElementById("timer").innerText =
            `Time Remaining: ${countDown}s`;
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

function userChoice(element) {
    // Removes the chosen element card from the list
    if (!gameStart ||
        selectedElements.includes(element)) { return; }
    //targets the selected elemental card and stores it
    const card =
        document.querySelector(`.element-card[data-element="${element}"]`);
    // Rotates card so its hidden
    card.style.transform = "rotateY(90deg) rotateX(90deg)";
    // Disable further interaction
    card.style.pointerEvents = "none";

    // Store selected element into the selectedElements array
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
    // After the user has chosen correctly the card is removed 
    // from the array and will not appear again.
    defeatedElements.push(randomElement);
}

function evaluateGame(Win) {
    const resultElement =
        document.getElementById("result");
    const playerScore =
        document.getElementById("playerScore");

    // Stop the random element interval after user makes a choice
    clearInterval(selectElement);

    // Stop the countDown timer
    clearInterval(timerInterval);
    // Display the result based on whether the user won or lost and adds 1 to the win streak score
    if (Win) {
        resultElement.style.color = "rgb(106, 253, 143)";
        resultElement.innerText =
            "You Win! You defeated all the Monsters in the dungeon!";
            score ++;
            playerScore.innerText =
            `${score}`;
    } else {
        resultElement.style.color = "red";
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
        document.getElementById("instructions").style.display
            = "inline-block";
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

function manual() {
    Swal.fire(
         "How to play",
         `There are 6 known monsters down in the dungeon
          and we have given you the needed summoning magic
           to fend off these beasts. All 6 monsters are weak
            to 1 element type for example fire is put out by
             water and thunder can decimate water but be quick
              the monsters will quickly attack and run so you
               only get a few seconds to react`
      );
}

