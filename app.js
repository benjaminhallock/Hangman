const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const gameRouter = require('./routes/game');
const app = express();

const hbs = exphbs.create({
    extname: '.hbs',
    helpers: {
        eq: (v1, v2) => v1 === v2,
        notEq: (v1, v2) => v1 !== v2,
        isGameOver: (gameOver) => gameOver.status !== 'ongoing'
    }
});

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

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
