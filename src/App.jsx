import { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const updateTask = () => {
    if (!input.trim()) return;
    setTasks(tasks.map(t => (t.id === editId ? { ...t, text: input } : t)));
    setInput("");
    setEditId(null);
  };

  const startEdit = (task) => {
    setInput(task.text);
    setEditId(task.id);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const doneCount = tasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sidebar */}
        <aside className="md:col-span-1 bg-white rounded-2xl shadow p-5">
          <h1 className="text-xl font-bold mb-4">📝 My Tasks</h1>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold">{tasks.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Completed</span>
              <span className="font-semibold text-green-600">{doneCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Pending</span>
              <span className="font-semibold text-orange-600">{tasks.length - doneCount}</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="md:col-span-2 bg-white rounded-2xl shadow p-5">
          {/* Input Row */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="What do you need to do?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {editId ? (
              <button
                onClick={updateTask}
                className="bg-green-500 text-white px-5 rounded-xl hover:bg-green-600"
              >
                Update
              </button>
            ) : (
              <button
                onClick={addTask}
                className="bg-indigo-500 text-white px-5 rounded-xl hover:bg-indigo-600"
              >
                Add
              </button>
            )}
          </div>

          {/* List */}
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex items-center gap-3 border rounded-xl px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4"
                />

                <span
                  className={`flex-1 ${task.done ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {task.text}
                </span>

                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          {tasks.length === 0 && (
            <p className="text-center text-gray-400 mt-6">No tasks yet</p>
          )}
        </main>
      </div>
    </div>
  );
}
