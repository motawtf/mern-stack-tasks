const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req, res) => {
    const tasks = await Task.find();

    res.json({
        status: 'OK',
        data: tasks
    });
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);

    res.json({
        status: 'OK',
        data: task
    });
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({
        title,
        description
    });
    await task.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({
        status: 'OK',
        data: task
    });
});

router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        title, 
        description
    };
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTask, { useFindAndModify: false });
    res.json({
        status: 'OK',
        data: newTask
    });
});

router.delete('/:id', async (req, res) => {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'OK',
        data: deletedTask
    });
});

module.exports = router;