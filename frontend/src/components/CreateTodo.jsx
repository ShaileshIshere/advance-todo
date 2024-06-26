import { useState } from "react";

export default function CreateTodo({ addTodoToList }) {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleAddTodo = async () => {
        try {
            // const response = await fetch("http://localhost:3000/todo", {
            const response = await fetch("https://advance-todo-server-iota.vercel.app/todo", {
                method: "POST",
                body: JSON.stringify({
                    task: task,
                    description: description
                }),
                headers: {
                    // The 'Content-Type' header is set to 'application/json' to indicate that the request body is in JSON format
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                /* If the response is OK (status code 200-299), it parses the JSON response and shows an alert indicating that the todo was added. It then calls 'addTodoToList' with the new todo item to update the parent component’s state */
                const json = await response.json();
                alert("Todo added");
                addTodoToList(json.todo);
            } else {
                const errorData = await response.json();
                console.error("Failed to add todo:", errorData.msg);
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <div className="mb-4 w-full">
            <input
                type="text"
                placeholder="Task"
                className="border border-gray-300 p-2 rounded mb-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={(event) => setTask(event.target.value)}
                value={task}
            />
            <input
                type="text"
                placeholder="Description"
                className="border border-gray-300 p-2 rounded mb-2 w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
            />
            <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add
            </button>
        </div>
    );
}

/*
Summary
The 'CreateTodo' component provides a user interface for creating new todo items. It:

1. Manages 'task' and 'description' state variables for the input fields.
2. Defines an asynchronous function 'handleAddTodo' to send a POST request to the server to add a new todo item.
3. Updates the parent component’s state with the new todo item by calling 'addTodoToList'.
4. Renders input fields for the task and description, and a button to trigger the addition of the new todo item.
*/