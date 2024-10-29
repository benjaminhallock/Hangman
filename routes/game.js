const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Route to start a new game
router.get('/new', (req, res) => {
    const newGame = gameController.newGame();
    res.render('index', {
        wordDisplay: newGame.wordDisplay,
        hint: newGame.hint,
        remainingGuesses: newGame.remainingGuesses,
        guessedLetters: newGame.guessedLetters,
        remainingLetters: newGame.remainingLetters, // Include remaining letters here
        gameTitle: newGame.gameTitle,
        gameOver: newGame.gameOver, // Reset game over status
        hangmanImage : gameController.getHangmanImage(newGame.remainingGuesses),
        rightGuesses: newGame.rightGuesses,
        wrongGuesses: newGame.wrongGuesses
    });
});

// Route to handle a guess
router.post('/guess', (req, res) => {
    const letter = req.body.letter ? req.body.letter.toLowerCase() : null; // Check if letter is defined
    if (!letter) {
        return res.status(400).send('No letter selected');
    }
    if (gameController.hasGuessedLetter(letter)) {
        return res.status(400).send('Letter already guessed');
    }

    const gameState = gameController.guessLetter(letter);   
    
    if (gameState.gameOver.status !== 'ongoing') {
        res.render('index', {
            wordDisplay: gameState.wordDisplay,
            remainingGuesses: gameState.remainingGuesses,
            guessedLetters: gameState.guessedLetters,
            remainingLetters: gameState.remainingLetters, // Pass the remaining letters
            letters: gameState.letters, // Pass the updated letters
            gameTitle: 'Halloween Hangman',
            gameOver: gameState.gameOver, // Pass the game over status
            hangmanImage : gameController.getHangmanImage(gameState.remainingGuesses),
            rightGuesses: gameState.rightGuesses,
            wrongGuesses: gameState.wrongGuesses
        });
    } else if (gameState.gameOver.status === 'ongoing') {
        res.render('index', {
            wordDisplay: gameState.wordDisplay,
            remainingGuesses: gameState.remainingGuesses,
            remainingLetters: gameState.remainingLetters,
            guessedLetters: gameState.guessedLetters,
            letters: gameState.letters, // Pass the updated letters
            gameTitle: 'Halloween Hangman',
            gameOver: gameState.gameOver, // Pass the game over status
            hangmanImage : gameController.getHangmanImage(gameState.remainingGuesses),
            rightGuesses: gameState.rightGuesses,
            wrongGuesses: gameState.wrongGuesses
        });
    }
});

module.exports = router;
