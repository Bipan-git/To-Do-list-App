import React, { useState } from "react";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState([""]);

  const handleAddTask = () => {
    if (input.trim() === "") return;

    setTasks([...tasks, input]);
    setInput("");
  };
  const HandleDeletetask = (index) => {
    const updatedTaks = tasks.filter((_, i) => i != index);
    setTasks(updatedTaks);
  };
  return (
    <div className="todoContainer">
      <h2>My To-Do-list</h2>

      <div classNam="input-area">
        <input
          type="text"
          placeholder="Add new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task </button>
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => HandleDeletetask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Tasks yet</p>
      )}
    </div>
  );
}
