import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Todos({ todos, setTodos }) {

    /*
    -> This function is typically used in a React application where setTodos is a state updater function used to manage the list of todos.
    -> It assumes that setTodos is defined and properly updates the todos state to reflect the change in completion status of the todo item
    */
    const markAsCompleted = async (id) => {
        try {
            // const response = await fetch("http://localhost:3000/completed", {

            /*
            Endpoint and Request Setup:

            -> The function sends a PUT request to https://advance-todo-server-iota.vercel.app/completed to mark a todo item as completed.
            -> It includes the id of the todo item in the request body as JSON
            */
            const response = await fetch("https://advance-todo-server-iota.vercel.app/completed", {
                method: "PUT",
                body: JSON.stringify({ id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            /*
            Handling Response:

            => If the response from the server is successful (response.ok), it:
               -> Parses the JSON response data.
               -> Updates the local todos state using setTodos to mark the todo with the matching _id as completed (completed: true).
               -> Logs a message indicating the todo was successfully marked as completed.
            => If the response indicates an error (not response.ok), it:
               -> Parses the JSON error data from the response.
               -> Logs an error message indicating the failure to mark the todo as completed
            */
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, completed: true } : todo
                ));
                console.log("Todo marked as completed:", data.todo);
            } 

            /*
            Error Handling:

            -> If any error occurs during the fetch request or processing of the response, it catches the error and logs an appropriate error message.
            */
            else {
                const errorData = await response.json();
                console.error("Failed to mark as completed:", errorData.msg);
            }
        } catch (error) {
            console.error("Error marking as completed:", error);
        }
    };

    /*
    -> This function is typically used in a React application where setTodos is a state updater function used to manage the list of todos.
    -> It assumes the user provides new task and description inputs through prompts and updates the UI and server state accordingly
    */
    const editTodo = async (id) => {

        /*
        Prompt for New Task and Description:

        -> Uses 'prompt()' to interactively get new task and description inputs from the user.
        -> If either 'newTask' or 'newDescription' is empty (user cancels or provides no input), the function returns early without making the request
        */
        const newTask = prompt("Enter new task:");
        const newDescription = prompt("Enter new description:");
        if (!newTask || !newDescription) return;

        try {
            // const response = await fetch(`http://localhost:3000/todo/${id}`, {
            /*
            Endpoint and Request Setup:

            -> Constructs a PUT request to https://advance-todo-server-iota.vercel.app/todo/${id} to update the todo with the specified id.
            -> Includes the updated 'task' and 'description' in the request body as JSON
            */
            const response = await fetch(`https://advance-todo-server-iota.vercel.app/todo/${id}`, {
                method: "PUT",
                body: JSON.stringify({ task: newTask, description: newDescription }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            /*
            Handling Response:

            => If the response from the server is successful (response.ok), it:
                -> Parses the JSON response data.
                -> Updates the local todos state using setTodos to reflect the edited todo item by mapping through the todos array:
                    - If the todo._id matches id, it replaces task and description with newTask and newDescription.
                    - Otherwise, it keeps the todo item unchanged.
                -> Logs a message indicating the todo was successfully updated
            */
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.map(todo =>
                    todo._id === id ? { ...todo, task: newTask, description: newDescription } : todo
                ));
                console.log("Todo updated:", data.todo);
            /*
            => If the response indicates an error (not response.ok), it:
                -> Parses the JSON error data from the response.
                -> Logs an error message indicating the failure to update the todo.
            */
            } else {
                const errorData = await response.json();
                console.error("Failed to update todo:", errorData.msg);
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    /*
    -> This function is typically used in a React application where setTodos is a state updater function used to manage the list of todos.
    -> It ensures that the UI and server state remain synchronized when a user confirms the deletion of a todo item
    */
    const deleteTodo = async (id) => {

        /*
        Confirmation Dialog:

        -> Uses window.confirm() to prompt the user for confirmation before proceeding with the deletion.
        -> If the user cancels the confirmation dialog (clicks "Cancel"), the function returns early without making the request.
        */
        if (!window.confirm("Are you sure you want to delete this todo?")) return;

        try {
            // const response = await fetch(`http://localhost:3000/todo/${id}`, {
            /*
            Endpoint and Request Setup:

            -> Constructs a DELETE request to https://advance-todo-server-iota.vercel.app/todo/${id} to delete the todo with the specified id
            */
            const response = await fetch(`https://advance-todo-server-iota.vercel.app/todo/${id}`, {
                method: "DELETE"
            });

            /*
            Handling Response:

            => If the response from the server is successful (response.ok), it:
                -> Parses the JSON response data.
                -> Updates the local todos state using setTodos to remove the deleted todo item by filtering out the todo with the matching _id.
                -> Logs a message indicating the todo was successfully deleted.
            */
            if (response.ok) {
                const data = await response.json();
                setTodos(todos.filter(todo => todo._id !== id));
                console.log("Todo deleted:", data.todo);
            /*
            => If the response indicates an error (not response.ok), it:
                -> Parses the JSON error data from the response.
                -> Logs an error message indicating the failure to delete the todo.
            */
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
                <div key={todo._id} className="border-b border-gray-300 p-2 flex justify-between items-center dark:border-gray-700">
                    <div>
                        <h1 className={`text-xl ${todo.completed ? 'line-through text-gray-500' : 'dark:text-white'}`}>{todo.task}</h1>
                        <h2 className="text-gray-700 dark:text-gray-400">{todo.description}</h2>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => markAsCompleted(todo._id)}
                            className={`px-4 py-2 rounded ${todo.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700 dark:text-white'}`}
                        >
                            {todo.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                        </button>
                        <button
                            onClick={() => editTodo(todo._id)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            <EditNoteIcon />
                        </button>
                        <button
                            onClick={() => deleteTodo(todo._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

  