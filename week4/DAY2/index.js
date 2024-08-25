import express from "express";

const app = express();
const port = 5000;
app.use(express.json());

let todos = [];
let nextId = 1;

// Create a new todo
app.post("/todos", (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = { id: nextId++, title, completed };
  todos.push(newTodo);
  res.status(201).send(newTodo);
});

// Get all todos
app.get("/todos", (req, res) => {
  res.status(200).send(todos);
});

// Get a specific todo by id
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  res.status(200).send(todo);
});

// Update a todo by id
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).send("Todo not found");
  }
  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;
  res.status(200).send(todo);
});

// Delete a todo by id
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Todo not found");
  }
  todos.splice(index, 1);
  res.status(200).send("Todo deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
