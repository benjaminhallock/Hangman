const Words = require('../models/Words');

let wordDetails;
let guessedLetters = [];
let remainingGuesses;
let maxGuesses = 6;

// Initialize a new game
exports.newGame = () => {
    const words = new Words();
    wordDetails = words.getRandomWord(); // This should set wordDetails correctly
    guessedLetters = [];
    remainingGuesses = maxGuesses;

    // Prepare the letters array
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return {
        wordDisplay: getDisplayWord(),
        hint: wordDetails.hint,
        remainingGuesses,
        guessedLetters,
        letters // Add this line
    };
};

// Handle guessing logic
exports.guessLetter = (letter) => {
    if (!wordDetails) {
        throw new Error("Game has not been initialized. Please start a new game.");
    }

    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!wordDetails.word.includes(letter)) {
            remainingGuesses--;
        }
    }

    // Create an array of remaining letters
    const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const remainingLetters = allLetters.filter(l => !guessedLetters.includes(l));

    return {
        wordDisplay: getDisplayWord(),
        remainingGuesses,
        guessedLetters,
        gameOver: isGameOver(),
        word: wordDetails.word,
        letters: remainingLetters // Return the remaining letters
    };
};

// Generate display word (with underscores for unguessed letters)
const getDisplayWord = () => {
    return wordDetails.word.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : '_').join(' ');
};

// Check if game is over (win or lose)
const isGameOver = () => {
    const isWordGuessed = !getDisplayWord().includes('_');
    const hasNoMoreGuesses = remainingGuesses <= 0;

    if (isWordGuessed) {
        return { status: 'win', message: 'Congratulations! You won!' };
    } else if (hasNoMoreGuesses) {
        return { status: 'lose', message: `You lost! The word was ${wordDetails.word}` };
    }

    return { status: 'ongoing' };
};
