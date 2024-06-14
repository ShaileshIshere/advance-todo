import { useState, useEffect } from 'react';
import CreateTodo from './components/CreateTodo.jsx';
import Todos from './components/Todos.jsx';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      // const response = await fetch("http://localhost:3000/todos");
      const response = await fetch("https://advance-todo-server-iota.vercel.app/todos");
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
      } else {
        console.error("Error fetching todos:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoToList = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <CreateTodo addTodoToList={addTodoToList} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
