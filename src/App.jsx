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
    
  )
}

export default App


layout and think time