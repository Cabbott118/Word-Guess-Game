//Assigning Global Variables
var possiblePokemon = [
    "venasaur",
    "charizard",
    "blastoise",
    "pikachu",
    "snorlax",
    "mewtwo",
    "mew"
];

var maxGuesses = 10;
var guessedLetters = [];
var guessingName;
var nameToMatch;
var numGuesses;
var wins = 0;
var losses = 0;

//Used to reset current Pokemon display, and start game
resetPokemon();

function resetPokemon() {
    //Fills remaining guesses with max(10)
    numGuesses = maxGuesses;

    //Pulls random Pokemon from array
    nameToMatch = possiblePokemon[Math.floor(Math.random() * possiblePokemon.length)].toUpperCase();

    //If you'd like to cheat, here you go
    console.log(nameToMatch);

    //Empty arrays for storing guessed letters
    guessedLetters = [];
    guessingName = [];

    for (var i = 0, x = nameToMatch.length; i < x; i++) {
        if (nameToMatch[i] === " ") {
            guessingName.push(" ");
        } else {
            guessingName.push("_ ");
        }
    }

    updateScreen();
}

//Check if key input is alpha
var isAlpha = function (ch) {
    return /^[A-Z]$/i.test(ch);
}

//Start game if letter is pressed
document.onkeyup = function(event) {
    if (isAlpha(event.key)) {
        checkForLetter(event.key.toUpperCase())
//Alert user to input alpha key if non-alpha key is released
    } else alert("Please enter an Alphabetic key to play!");
}

//Function for checking letter inputs against randomly selected Pokemon name
function checkForLetter(letter) {
    
    //Create local var to be used for non correct keys
    var foundLetter = false;

    //For loop for correct letters
    for (var i = 0, x = nameToMatch.length; i < x; i++) {
        if (letter === nameToMatch[i]) {
            guessingName[i] = letter;
            foundLetter = true;

            //Increment wins and update screen
            if (guessingName.join("") === nameToMatch) {
                wins++;
                setTimeout(resetPokemon, 3000);
            }
        }
        updateScreen();
    }

    //If wrong letter, decrement remaining guesses
    if (!foundLetter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            numGuesses--
        }

        //If remaining guesses equals 0, increment losses and update screen
        if (numGuesses === 0) {
            guessingName = nameToMatch.split();
            losses++;
            setTimeout(resetPokemon, 3000);
        }
    }
    updateScreen();
}

//Update HTML
function updateScreen() {
    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalLosses").innerText = losses;
    document.getElementById("currentPokemon").innerText = guessingName.join("");
    document.getElementById("remainingGuesses").innerText = numGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters.join(" ");
}