const router = require('express').Router();
const database = require('../database/dbConfig');

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

module.exports = router;