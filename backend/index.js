const express = require("express");
const { createTodo, updateTodo } = require("./types.js");
const { todo } = require("./DataBase.js");
const cors = require("cors");
const app = express();

app.use(express.json());

// const allowedOrigins = ['http://localhost:5713', 'http://localhost:5173'];
const allowedOrigins = ['https://advance-todo-server-iota.vercel.app', 'https://advance-todo-zeta.vercel.app', 'https://advance-todo-xi.vercel.app'];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // allows the request
        } else {
            callback(new Error('Not allowed by CORS')); // blocks the request
        }
    }
}));

const PORT = 3000;

// we're creating a todo task here
app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
        return;
    }

    try {
        const newTodo = await todo.create({
            task: createPayload.task,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo created successfully",
            todo: newTodo
        });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            msg: "Failed to create todo"
        });
    }
});

// here we're accessing all todo tasks
app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            msg: "Failed to fetch todos"
        });
    }
});

// here we're marking todo tasks as completed
app.put("/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        res.status(400).json({
            msg: "Invalid input"
        });
        return;
    }

    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.body.id,
            { completed: true },
            { new: true } // this ensures that the updated document is returned
        );
        if (updatedTodo) {
            res.json({
                msg: "Todo marked as completed",
                todo: updatedTodo
            });
        } else {
            res.status(404).json({
                msg: "Todo not found"
            });
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Failed to mark todo as completed"
        });
    }
});

// New endpoint to edit a todo
app.put("/todo/:id", async (req, res) => {
    const { task, description } = req.body;

    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.params.id,
            { task, description },
            { new: true } // this ensures that the updated document is returned, not the original document before the update
        );
        if (updatedTodo) {
            res.json({
                msg: "Todo updated successfully",
                todo: updatedTodo
            });
        } else {
            res.status(404).json({
                msg: "Todo not found"
            });
        }
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Failed to update todo"
        });
    }
});

// New endpoint to delete a todo
app.delete("/todo/:id", async (req, res) => {
    try {
        const deletedTodo = await todo.findByIdAndDelete(req.params.id);
        if (deletedTodo) {
            res.json({
                msg: "Todo deleted successfully",
                todo: deletedTodo
            });
        } else {
            res.status(404).json({
                msg: "Todo not found"
            });
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            msg: "Failed to delete todo"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
