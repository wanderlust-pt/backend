const router = require('express').Router();
const database = require('../database/dbConfig');

const cool = require('cool-ascii-faces');

router.get('/cool', async (req, res) => {  // Deployment check
    res.send(cool());
})


// GET all todos
router.get('/list', async (req, res) => {
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

router.post('/create', async (req, res) => {

})

router.delete('/delete', async (req, res) => {

})

module.exports = router;