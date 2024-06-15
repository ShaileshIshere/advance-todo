import { useState, useEffect } from 'react';
import CreateTodo from './components/CreateTodo.jsx';
import Todos from './components/Todos.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchTodos = async () => {
    try {
      // const response = await fetch("http://localhost:3000/todos");
      /* fetchTodos is an asynchronous function that fetches todos from a server.
         It uses the Fetch API to make a GET request to the specified URL. */
      const response = await fetch("https://advance-todo-server-iota.vercel.app/todos");
      if (response.ok) {
        // If the response is OK, it parses the JSON data and updates the todos state with the fetched todos.
        const data = await response.json();
        setTodos(data.todos);
        // If there is an error during fetching, it logs the error to the console.
      } else {
        console.error("Error fetching todos:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  /* useEffect is used to call fetchTodos when the component mounts.
  The empty dependency array [] means this effect runs only once, when the component mounts. */
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodoToList = (newTodo) => {
    // It uses the spread operator (...todos) to create a new array with the existing todos and appends newTodo.
    setTodos([...todos, newTodo]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    // <div className="container mx-auto p-4 max-w-md">
    //   <h1 className="text-3xl font-bold text-red-600 text-center mb-4">To - Do's</h1>
    //   <ThemeToggle />
    //   <CreateTodo addTodoToList={addTodoToList} />
    //   <Todos todos={todos} setTodos={setTodos} />
    // </div>
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold">Todo App</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <CreateTodo addTodoToList={addTodoToList} />
        <Todos todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;

/*
Summary
This React component:

1. Manages State: Uses the 'useState' hook to manage the 'todos' state.
2. Fetches Data: Uses the 'useEffect' hook to fetch todos from a server when the component mounts.
3. Handles Errors: Logs errors to the console if fetching fails.
4. Updates State: Provides a function to add new todos to the list.
5. Renders Child Components: Renders 'CreateTodo' for adding todos and 'Todos' for displaying and managing the list of todos
*/