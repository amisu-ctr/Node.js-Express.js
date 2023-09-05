const getAllTasks = (req, res) => {
  res.send('all items from the file');
};

const createTask = (req, res) => {
  console.log(req.body);
  res.json(req.body);
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
