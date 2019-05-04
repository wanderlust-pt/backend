const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cool = require('cool-ascii-faces');

const { logged } = require('../database/middleware/logged');
const { auth } = require('../database/middleware/auth');
const authRoutes = require('../routes/authRoutes');
const todoRoutes = require('../routes/todoRoutes');

const server = express();

// middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/', authRoutes);
server.use('/todos', auth, logged, todoRoutes);


// just makes sure server is live and running mainly a sanity check
server.get('/', async (req, res) => {
    res.send(`Welcome to the WunderList 2.0 API!`)
});

// simple GET check that displays a random ascii face
server.get('/cool', (req, res) => {  // Deployment check
    res.send(cool());
});

module.exports = server;