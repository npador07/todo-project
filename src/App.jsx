import { useState } from 'react'
import './App.css'

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
if (input.trim() === "") return;
setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
setInput("");
};

  const toggleTask = (id) => {
setTasks(
tasks.map((task) =>
task.id === id ? { ...task, done: !task.done } : task
)
);
};


const deleteTask = (id) => {
setTasks(tasks.filter((task) => task.id !== id));
};
   
  return (
    <div> 
         <h1>📝 Todo List</h1>

    <div className="input-group">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>

    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? "done" : ""}>
          <span onClick={() => toggleTask(task.id)}>
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>❌</button>
        </li>
      ))}
    </ul>


    </div>
  );
}

export default App

