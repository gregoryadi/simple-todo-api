const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

if (fs.existsSync('todos.json')) {
  const data = fs.readFileSync('todos.json', 'utf-8');
  todos = JSON.parse(data);
}

const saveTodosToFile = () => {
  fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2), 'utf-8');
};

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: todos.length + 1, task };
  todos.push(newTodo);
  saveTodosToFile();
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const todo = todos.find((t) => t.id === parseInt(id));

  if (todo) {
    todo.task = task;
    saveTodosToFile();
    res.json(todo);
  } else {
    res.status(404).send('To-Do item not found');
  }
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id !== parseInt(id));
  saveTodosToFile();
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

if (!task || task.trim() === "") {
    return res.status(400).send('Task cannot be empty');
  }
  