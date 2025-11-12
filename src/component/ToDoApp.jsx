import React, { useState, useEffect } from "react";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  // ✅ Load tasks from local storage when the app starts
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    } catch (e) {
      console.error("failed to load tasks", e);
    }
  }, []);

  // ✅ Save tasks to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error("failed to save tasks:", e);
    }
  }, [tasks]);

  // ✅ Add or Update a Task
  const handleAddTask = () => {
    if (input.trim() === "") return;

    if (isEditing) {
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex].text = input;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      const newTask = { text: input, completed: false };
      setTasks([...tasks, newTask]);
    }
    setInput("");
  };

  // ✅ Delete task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // ✅ Edit task
  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setInput(tasks[index].text);
  };

  // ✅ Toggle complete
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // ✅ Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="todoContainer">
      <h2>My To-Do List</h2>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="filter-section">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {filteredTasks.length > 0 ? (
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "gray" : "black",
                }}
              >
                {task.text}
              </span>
              <button
                style={{
                  background: "black",
                  color: "white",
                  marginLeft: "10px",
                }}
                onClick={() => handleEditTask(index)}
              >
                Edit
              </button>
              <button
                style={{ background: "red", color: "white", marginLeft: "5px" }}
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks to show</p>
      )}
    </div>
  );
}
