const router = require('express').Router();
const database = require('../database/dbConfig');
const bcrypt = require('bcrypt');

// Token generation, cookie
const { genToken } = require('../database/middleware/auth');


// POST register account
router.post('/register', async (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    try {
        const [id] = await database('users').insert(user);
        res.status(201).json({
            message: "New user created",
            id
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error creating user"
        })
    }
});

// POST login with username and password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await database('users').where({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);
            res.status(200).json({
                message: `Welcome ${user.username}, you are logged in for 1 hour!`,
                token
            })
        } else {
            res.status(401).json({
                error: 'Invalid credentials'
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;