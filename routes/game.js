const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gamecontroller');

// Route to start a new game
router.get('/new', (req, res) => {
    const newGame = gameController.newGame();
    res.render('index', {
        wordDisplay: newGame.wordDisplay,
        hint: newGame.hint,
        remainingGuesses: newGame.remainingGuesses,
        guessedLetters: newGame.guessedLetters,
        letters: newGame.letters, // Include letters here (full alphabet)
        gameTitle: 'Halloween Hangman',
        gameOver: null // Reset game over status
    });
});

// Route to handle a guess
router.post('/guess', (req, res) => {
    const letter = req.body.letter ? req.body.letter.toLowerCase() : null; // Check if letter is defined
    if (!letter) {
        return res.status(400).send('No letter selected');
    }

    const gameState = gameController.guessLetter(letter);
    const gameOver = gameState.gameOver;

    if (gameOver.status !== 'ongoing') {
        // Pass the game status to the index view
        res.render('index', {
            wordDisplay: gameState.wordDisplay,
            remainingGuesses: gameState.remainingGuesses,
            guessedLetters: gameState.guessedLetters,
            letters: gameState.letters, // Pass the updated letters
            gameTitle: 'Halloween Hangman',
            gameOver: gameOver // Pass the game over status
        });
    } else {
        res.render('index', {
            wordDisplay: gameState.wordDisplay,
            remainingGuesses: gameState.remainingGuesses,
            guessedLetters: gameState.guessedLetters,
            letters: gameState.letters, // Pass the updated letters
            gameTitle: 'Halloween Hangman',
            gameOver: null // No game over status
        });
    }
});

module.exports = router;
