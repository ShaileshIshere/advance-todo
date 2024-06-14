import React from 'react';

export default function Todos({ todos, setTodos }) {
    const markAsCompleted = async (id) => {
        try {
            // const response = await fetch("http://localhost:3000/completed", {
            const response = await fetch("https://advance-todo-server-iota.vercel.app/completed", {
                method: "PUT",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, completed: true } : todo
                ));
                console.log("Todo marked as completed:", data.todo);
            } else {
                const errorData = await response.json();
                console.error("Failed to mark as completed:", errorData.msg);
            }
        } catch (error) {
            console.error("Error marking as completed:", error);
        }
    };

    const editTodo = async (id) => {
        const newTask = prompt("Enter new task:");
        const newDescription = prompt("Enter new description:");
        if (!newTask || !newDescription) return;

        try {
            // const response = await fetch(`http://localhost:3000/todo/${id}`, {
              const response = await fetch(`https://advance-todo-server-iota.vercel.app/todo/${id}`, {
                method: "PUT",
                body: JSON.stringify({ task: newTask, description: newDescription }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, task: newTask, description: newDescription } : todo
                ));
                console.log("Todo updated:", data.todo);
            } else {
                const errorData = await response.json();
                console.error("Failed to update todo:", errorData.msg);
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        if (!window.confirm("Are you sure you want to delete this todo?")) return;

        try {
            // const response = await fetch(`http://localhost:3000/todo/${id}`, {
              const response = await fetch(`https://advance-todo-server-iota.vercel.app/todo/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.filter(todo => todo._id !== id));
                console.log("Todo deleted:", data.todo);
            } else {
                const errorData = await response.json();
                console.error("Failed to delete todo:", errorData.msg);
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.task}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => markAsCompleted(todo._id)}>
                        {todo.completed ? "Completed" : "Mark as completed"}
                    </button>
                    <button onClick={() => editTodo(todo._id)}>Edit</button>
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

  