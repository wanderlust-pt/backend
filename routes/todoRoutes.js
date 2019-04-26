const router = require('express').Router();
const database = require('../database/dbConfig');

// GET all todos
router.get('/todos', async (req, res) => {
    try {
        console.log(req.decoded.subject)
        const todo = await database('todos').where('userId', req.decoded.subject);
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            error: "The todo's information could not be retrieved"
        })
    }
});

module.exports = router;