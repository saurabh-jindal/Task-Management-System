// routes/tasks.js

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task
router.post('/', async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).send({
        message: "Title can not be empty!"
      });
      return;
    }

    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      timeline: req.body.timeline
    };
  
    console.log(tutorial);
    const task = await Task.create(tutorial);
    console.log(task);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create the task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      await task.update(req.body);
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to update the task' });
  }
});

// Get all tasks (paginated)
router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;

  try {
    const tasks = await Task.findAndCountAll({
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: 'Unable to retrieve tasks' });
  }
});

// Get task metrics
router.get('/metrics', async (req, res) => {
  try {
    console.log("here")
    const metrics = await Task.findAll({
      attributes: ['status', [sequelize.fn('COUNT', 'status'), 'count']],
      group: ['status'],
    });
    res.status(200).json(metrics);
  } catch (error) {
    res.status(400).json({ error: 'Unable to retrieve metrics' });
  }
});

module.exports = router;
