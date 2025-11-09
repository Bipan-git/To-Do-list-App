import React, { useState } from "react";
// import "./component/ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([""]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    setTasks([...tasks, newTask]);
    setNewTask("");
  };
  return (
    <div className="todo container">
      <div classNam="input-area">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task </button>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}{" "}
        </ul>
      </div>
    </div>
  );
}
