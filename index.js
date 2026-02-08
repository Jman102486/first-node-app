const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json()); // allows JSON requests
app.use(express.static("public"));

let tasks = [];

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

//POST new tasks
app.post("/tasks", (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text
    };

    tasks.push(newTask);
    res.status(201).json(newTask); // send a response back
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== id);

    res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
