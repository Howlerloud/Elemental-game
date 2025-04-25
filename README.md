# Elemental-game
A game where the user has to face off against the machine by using elements to counter the attackers! The objective of the game is for the player to use all of his monster cards to defeat the random monster that is rotated in before the timer runs out.
<img src="assets/readme/index.jpg">
<h1>Project Goals and User Experience</h1>
<h2>Project Goals</h2>
<ul>
  <li>The objective of this project is to make a fun fast paced card game that keeps the user thinking on the spot trying to memories a list of elements and their strengths and weaknesses.</li>
  <li>It has been designed to be easy to interact with, with 3 modes of difficulty.</li>
</ul>
<h2>User Stories</h2>
<ol>
  <li>As a first time user I want a clear and easy way to start the game.<br>This will be done when a clear start button is shown.</li>
  <li>As a first time user I want to see how to beat the game.<br>A description of the game and how to play it would help.</li>
  <li>As a first time user I want to know when I have won or lost the game.<br>A response at the end of the game so I know I have beaten it.</li>
  <li>As a user I want the game to vary with difficulty giving me a reason to come back and improve.<br> A selection of buttons or something to display that the difficulty is getting harder.</li>
  <li>As a user I want to be able to keep track of my wins.<br> A win counter that is clearly visible for me to keep track.</li>
</ol>
<h2>Future Improvements</h2>
<ul>
  <li>Adding Light and Dark elements to the game on hard mode</li>
  <li>On easy mode give the user 2 lives with each element so they don't lose on first pick</li>
  <li>A win streak counter to track the users wins and add secret level after 10 wins</li>
</ul>
<h1>Design</h1>
<p>The font Arial Sans Serif was used due to its great readability, modern aesthetic and accessibility</p>
<h2>Colour Palette</h2>
<img src="assets/readme/palette.jpg">
<p><a href="https://coolors.co/">Coolers was used to generate the colour scheme.</a></p>
<p>A dark theme was chosen to enhance the feeling of being in the dungeon adding to the user experience.</p>
<h2>Wireframes</h2>
<p>Below are the wireframes created for this project to give a good guide on how the finished product will look</p>
<hr>
<h3>The main menu for desktop</h3>
<img src="assets/readme/menu-desktop.jpg">
<hr>
<h3>The main menu showcased on a mobile device</h3>
<img src="assets/readme/menu-mobile.jpg">
<hr>
<h3>The game board shown on a desktop</h3>
<img src="assets/readme/game-desktop.jpg">
<hr>
<h3>The game board shown on a mobile device</h3>
<img src="assets/readme/game-mobile.jpg">
<hr>
<h3>The difficulty menu as shown on a desktop</h3>
<img src="assets/readme/difficulty.jpg">
<hr>
<h3>The difficulty menu shown on a mobile device</h3>
<img src="assets/readme/difficulty-mobile.jpg">
<hr>
<h1>Features</h1>
<p>A choice of Easy, Medium or hard mode are given to the user to vary the difficulty of the game.</p>

<p>The game board shows a list of 6 elemental monsters that the user has control over and must use them to defeat the monsters in the dungeon</p>
<img src="assets/readme/game-board.jpg">
<p>When a monster card is clicked it will either end the game telling the user they have been defeated if they picked incorrectly or flip and not be usable again if the user is correct.</p>

<p>A score counter at the top showing the user how many wins they have accrued and will reset if they lose a match.</p>

<h1>Testing</h1>
<h2>Manual Testing</h2>
<p>Manual Testing is the user/programmer checking code visually and comparing it to the results of the visual product. Check if buttons/links work, making sure code it outputting the correct response.</p>
<h3>When manualy testing the following was found</h3>
<ul>
  <li>All buttons work and execute the correct functions.</li>
  <li>I have tested the Sweet alert popup and it works correctly with the correct styling.</li>
  <li>I have tested the page in multiple resolutions and works for pc, ipad and mobile.</li>
  <li>All cards when clicked operate correctly and flip when interacted with.</li>
  <li>When directed to the wrong page the custom 404 page appears and after 10 seconds redirects the user to the main game page.</li>
  <li>The game works both when winning and losing resetting the game and sending the user back to the main menu.</li>
  <li>The timer counts down correctly and ends the game after the aloted time.</li>
  <li>The win counter works correctly by counting up by 1 when winning and resetting to 0 when defeated.</li>
  <li>All reactive css works when hoving over buttons.</li>
  <li>Allowed the timer to hit 0 and reset the game, after a set period of the time game closes and opens up the main menu.</li>
</ul>
<h3>When manually testing these bugs appeared in my project</h3>
<ol>
  <li>When scaling the website for mobile the random element card started to overlap the rest of the game board causing collisions with the players card hand. Css was addressed to be the issue and the random element was given its own div to be targeted and allowed for better spacing.</li>
  <li>When a game end the counters picture on the main menu would disappear. This turned out to be an issue with the java script as the image was missed out when displaying the menu after a game. To fix this 
    "document.getElementById('element-counters').style.display = 'inline-block';" was added to make the counters image appear after the timer has hit 0 or the player has won/lost.</li>
  <li>Timer started to display as ${countdown} this was due to a change in the colons being used that caused the template literal to become a string.</li>
  <li>The count down timer would start to countdown quicker as time passed. This was due to a nested setInterval inside another setInterval which was constantly being called causing the timer to speed up every second.</li>
  <li>When winning or losing the start button would flicker on the screen no matter what part of the game you were on. This was due to another setInterval the kept calling the menu. It was changed to a setTimeout to stop the function from being called constantly.</li>
</ol>
  <p>Currently there is only one thing i would like to change and that is the game will sometimes make the same random element appear more that once in a row. This would make the user think the game has bugged/stopped but in fact it has just rolled the same random element multiple times. I would like to make it so the current element is not part of the array when its in play.</p>
<h2>Automated Testing</h2>
<p>Automated Testing is the use of external software to check for errors in the code and to highlight them to be addressed.<p>
<h3>Html</h3>
<p>W3C markup was used to validate my html and as shown it passed, it only addresses an empty heading that is filled when certain parameters are met on js.</p>
<img src="assets/readme/html.jpg">
<h3>CSS</h3>
<p>W3 Jigsaw was used to check the css used in my project and has passed with no issues.</p>
<img src="assets/readme/css.jpg">
<h3>Lighthouse</h3>
<p>Lighthouse was used to test the load times, accessability and practices.</p>
<img src="assets/readme/lighthouse.jpg">
<h3>Java Script</h3>
<ul>
  <li>I used ES lint to validate my JS code. ES lint highlighted errors in my code and allowed me to find better ways to write the syntax. The code now contains no errors but does flag 6 variables that are defined but not used, this happens because the variables are used in the html and ES lint doesn't read html so it just flags as unused. </li>
</ul>
<img src="assets/readme/js.jpg">
<h2>User Stories Testing</h2>
  <ol>
  <li>As a first time user I want a clear and easy way to start the game.<br>The game shows a start button on the front of the page followed by a choice of 3 difficulty buttons</li>
    <img src="assets/readme/start.jpg">
  <li>As a first time user I want to see how to beat the game.<br>On the front page of the game a clear image shows what each element counters and what they get countered by and a instructions popup.</li>
    <img src="assets/readme/instructions.jpg">
  <li>As a first time user I want to know when I have won or lost the game.<br>After beating all 6 enemy's the game comes up with a display showing I have beaten the dungeon. If I am defeated the game notifies me that I have been overrun.</li>
    <img src="assets/readme/defeat.jpg">
  <li>As a user I want the game to vary with difficulty giving me a reason to come back and improve.<br> I can clearly see when I start the game there is 3 difficulty's to choose from that decrease the timer and increase the monster interval speed.</li>
    <img src="assets/readme/difficulty-choice.jpg">
  <li>As a user I want to be able to keep track of my wins.<br> There is a win counter displayed at the top of the screen for me to keep track of my win streak.</li>
    <img src="assets/readme/win-counter.jpg">
</ol>
<h2>Future additions</h2>
<ul>
  <li>A secret level that appears after 5 consecutive wins that changes the monsters image to something new and jumbles up the element type wording so fire will look something like "RFIE" to throw the user off.</li>
  <li>A economy system with a shop after each win allowing the player to change the way the game is played for example "Boots of swiftness: Once used the player will retreat from the dungeon, keeping their win count but the boots will be destroyed."</li>
</ul>
<h3>How to Fork</h4>
<p>To fork the Essex Pc's repository:</p>
<ol>
  <li>Log in (or sign up) to Github.</li>
  <li>Go to the repository for this project, HTTPS://github.com/Howlerloud/Essex-Pc-s.</li>
  <li>Click the Fork button in the top right corner.</li>
  </ol>
<h3>How to Clone</h4>
<p>To clone the Essex-Pc-s repository:</p>
<ol>
  <li>Log in (or sign up) to GitHub.</li>
  <li>Go to the repository for this project, HTTPS://github.com/Howlerloud/Essex-Pc-s.</li>
  <li>Click on the code button, select whether you would like to clone with HTTPS, SSH or GitHub CLI and copy the link shown.</li>
  <li>Open the terminal in your code editor and change the current working directory to the location you want to use for the cloned directory.</li>
  <li>Type 'git clone' into the terminal and then paste the link you copied in step 3. Press enter.</li>
</ol>
<h2>Credits</h2>
<ul>
  <li>https://www.w3schools.com/js/js_htmldom_css.asp helping with styling of text using js.</li>
  <li>W3 Schools helped with a lot of js structure.</li>
  <li>Media for monsters. - https://finalfantasy.fandom.com/wiki/Final_Fantasy_XI_enemies </li>
  <li>Bro Code to help with js.</li>
  <li>https://www.tutorialspoint.com/How-to-use-JavaScript-to-redirect-a-webpage-after-5-seconds & https://www.tutorialspoint.com/How-do-I-call-a-JavaScript-function-on-page-load#:~:text=By%20using%20the%20window.,executed%20after%20the%20page%20load - To build the function that controlls the 404 redirect</li>
  <li>Images used - https://finalfantasy.fandom.com/wiki/Final_Fantasy_XI_enemies</li>
</ul>

