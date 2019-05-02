const router = require('express').Router();
const database = require('../database/dbConfig');

router.get('/', async (req, res) => {

})

// GET all todos
router.get('/list', async (req, res) => {
    const todo = await database('todos').where('userId', req.decoded.subject);
    try {
        console.log(req.decoded.subject)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            error: "The todo's information could not be retrieved"
        })
    }
});

// POST new todo
router.post('/create', async (req, res) => {
    const newTodo = req.body;
    try {
        if (!newTodo.title) {
            res.status(404).json({
                message: "Todo needs a title"
            })
        }
        const todo = await database('todos').insert(newTodo);
        res.status(201).json({
            message: "Todo has been created",
            todo
        })
    } catch (e) {
        res.status(500).json(e)
    }
});

// GET todo by ID
router.get('/list/:id', async (req, res) => {
    const id = req.params.id;
    const userTodos = await database('todos').where('userId', req.decoded.subject);
    try {
        if (req.decoded.subject) {
            const test = await userTodos.where(id);
            console.log(test)
            res.status(200).json(test)
        } else {
            res.status(404).json({
                error: "Todo with the specified ID does not exist"
            })
        }
    } catch (e) {
        res.status(500).json(e)
    }
});

// PUT update todo by ID
router.put('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if (id === undefined || req.body.title === undefined) {
            res.status(400).json({
                error: "Title is required for the todo"
            })
        }
        const update = await database('todos').where('id', id).update(req.body);
        res.status(200).json({
            message: "Todo has been updated",
            update
        })
    } catch (e) {
        res.status(500).json(e)
    }
});

// DELETE a todo
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const count = await database('todos').where('id', id).del();
    try {
        if (count > 0) {
            res.status(200).json({
                message: "Todo has been deleted"
            })
        } else {
            res.status(404).json({
                error: "The todo with the specified ID does not exist"
            })
        }
    } catch (e) {
        console.log(req.params);
        res.status(500).json(e)
    }
});

module.exports = router;