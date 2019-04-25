const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

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

// just makes sure server is live and running
server.get('/', async (req, res) => {
    res.send(`Welcome to the WunderList 2.0 API`)
});

module.exports = server;