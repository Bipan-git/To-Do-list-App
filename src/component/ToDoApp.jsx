import React, { useState } from "react";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState([""]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  //add new task
  const handleAddTask = () => {
    if (input.trim() === "") return;

    if (isEditing) {
      //updated tasks immutably
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex] = input;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTasks([...tasks, input]);
    }
    setInput("");
  };
  //delete task

  const handleDeleteTask = (index) => {
    const updatedTaks = tasks.filter((_, i) => i != index);
    setTasks(updatedTaks);
  };

  //edit task
  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setInput(tasks[index]);
  };
  return (
    <div className="todoContainer">
      <h2>My To-Do-list</h2>

      <div classNam="input-area">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {isEditing ? "update Task" : "add task"}
        </button>
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {task}
              <button onClick={() => handleEditTask(index)}>Edit </button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "black" }}>No Tasks yet</p>
      )}
    </div>
  );
}
