const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const gameRouter = require('./routes/game');

const app = express();

// Register a custom helper for equality check
const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        eq: (a, b) => a === b // Custom helper to check equality
    }
});

// Set up Handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the game router
app.use('/game', gameRouter);

// Root route to start a new game
app.get('/', (req, res) => {
    res.redirect('/game/new');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
