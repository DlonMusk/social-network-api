
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set port number
const PORT = 3001;

// Create express App
const app = express();


// set middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})

