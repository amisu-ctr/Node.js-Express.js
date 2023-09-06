const Task = require('../models/Task');
const getAllTasks = (req, res) => {
  res.send('all items from the file');
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    console.log(task);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = (req, res) => {
  console.log(req.params.id);
  res.json({ id: req.params.id });
};

const updateTask = (req, res) => {
  res.send('update task');
};

const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = { getAllTasks, updateTask, createTask, getTask, deleteTask };
