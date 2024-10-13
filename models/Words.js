// models/Words.js
module.exports = class Words {
    constructor() {
        this.words = [
            { word: 'javascript', hint: 'A popular programming language for web development' },
            { word: 'nodejs', hint: 'JavaScript runtime built on Chrome\'s V8 engine' },
            { word: 'express', hint: 'A web framework for Node.js' },
            { word: 'mongoose', hint: 'An ODM library for MongoDB and Node.js' },
            { word: 'promise', hint: 'An object representing the eventual completion of an async operation' },
            { word: 'callback', hint: 'A function passed as an argument to another function' },
            { word: 'frontend', hint: 'Part of web development that deals with user interfaces' },
            { word: 'backend', hint: 'Part of web development that deals with servers and databases' },
            { word: 'async', hint: 'Allows non-blocking operations in JavaScript' },
            { word: 'await', hint: 'Pauses async function execution until a promise resolves' },
        ];
    }

    // Method to randomly pick a word
    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return this.words[randomIndex];
    }
}

