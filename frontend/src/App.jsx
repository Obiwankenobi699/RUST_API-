import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/todos");
        setTodos(res.data);
      } catch (err) {
        setError("Failed to load todos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault(); // fixed typo
    if (!newTodo.trim()) return;
    setAdding(true);
    setError(null);
    try {
      const response = await axios.post("/api/todos", { text: newTodo.trim() });
      // optimistic update could be used; here we append from server response
      setTodos((prev) => [...prev, response.data]);
      setNewTodo("");
    } catch (err) {
      setError("Failed to add todo.");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="shadow-xl w-full max-w-lg p-8 bg-white rounded-2xl">
        <h1 className="font-bold text-2xl mb-4">Task Manager</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <label htmlFor="todo-input" className="sr-only">
            New Task
          </label>
          <input
            id="todo-input"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border p-2 rounded flex-grow focus:outline-none"
            placeholder="Enter a task"
            disabled={adding}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={!newTodo.trim() || adding}
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </form>

        {error && (
          <div className="text-red-600 mb-2">
            {error}
          </div>
        )}

        {loading ? (
          <div>Loading tasks...</div>
        ) : todos.length === 0 ? (
          <div className="text-gray-500">No tasks yet.</div>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id ?? todo._id ?? Math.random()}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
