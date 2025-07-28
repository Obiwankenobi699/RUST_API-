import { useState } from "react";

function App() {
  const [newTodo, setNewTodo] = useState("");

 

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-xl w-fit p-8 max-w-lg">
        <h1 className="font-bold text-xl mb-4">Task Manager</h1>
        <form  className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter a task"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
