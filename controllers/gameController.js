const Words = require("../models/Words");

let wordDetails;
let guessedLetters = [];
let remainingGuesses;
let maxGuesses = 7;

// Initialize a new game
exports.newGame = () => {
  const words = new Words();
  wordDetails = words.getRandomWord();
  wordDetails.word = wordDetails.word.toUpperCase();
  hint = wordDetails.hint;
  guessedLetters = [];
  remainingGuesses = maxGuesses;

  // Prepare the letters array
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return {
    wordDisplay: getDisplayWord(),
    hint: wordDetails.hint,
    remainingGuesses: remainingGuesses,
    guessedLetters: guessedLetters,
    remainingLetters: letters,
    gameTitle: "Halloween Hangman",
    gameOver: isGameOver(),
    rightGuesses: guessedLetters.filter(
      (letter) => wordDetails.word.includes(letter)
    ).length,
    wrongGuesses: guessedLetters.filter(
      (letter) => !wordDetails.word.includes(letter)
    ).length,
  };
};

// Add this method to get the hangman image based on remaining guesses
exports.getHangmanImage = (remainingGuesses) => {
  const x = maxGuesses - remainingGuesses + 1;
  return `/images/${x}.png`;
};

// Handle guessing logic
exports.guessLetter = (letter) => {
  if (isGameOver().status === "win" || isGameOver().status === "lose") {
    return this.newGame();
  }

  if (!wordDetails.word) {
    throw new Error("No game in progress");
  }

  letter = letter.toUpperCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!wordDetails.word.includes(letter)) {
      remainingGuesses--;
    }
  }
  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  remainingLetters = allLetters.filter(
    (letter) => !guessedLetters.includes(letter)
  );

  return {
    wordDisplay: getDisplayWord(),
    remainingGuesses: remainingGuesses,
    guessedLetters: guessedLetters,
    remainingLetters: remainingLetters,
    gameOver: isGameOver(),
    hangmanImage: getHangmanImage(remainingGuesses),
    rightGuesses: guessedLetters.filter(
      (letter) => wordDetails.word.includes(letter)
    ).length,
    wrongGuesses: guessedLetters.filter(
      (letter) => !wordDetails.word.includes(letter)
    ).length,
  };
};

//get Hangman image
const getHangmanImage = (remainingGuesses) => {
  return `/images/${maxGuesses - remainingGuesses}.png`;
};

// Generate display word (with underscores for unguessed letters)
const getDisplayWord = () => {
  return wordDetails.word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
};

const isGameOver = () => {
  const isWordGuessed = !getDisplayWord().includes("_");
  const hasNoMoreGuesses = remainingGuesses <= 0;

  if (isWordGuessed) {
    return { status: "win", message: "Congratulations! You won!" };
  } else if (hasNoMoreGuesses) {
    return {
      status: "lose",
      message: `You lost! The word was ${wordDetails.word}`,
    };
  }
  return { status: "ongoing" };
};

// Add this method to your gameController
exports.hasGuessedLetter = (letter) => {
  return guessedLetters.includes(letter);
};
