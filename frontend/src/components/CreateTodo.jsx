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
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
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
        <div>
            <input
                type="text"
                placeholder="task"
                onChange={(event) => setTask(event.target.value)}
                value={task}
            />
            <br />
            <input
                type="text"
                placeholder="description"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
            />
            <br />
            <button onClick={handleAddTodo}>Add</button>
        </div>
    );
}

