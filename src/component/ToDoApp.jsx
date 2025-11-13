import React, { useState, useEffect } from "react";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      const newTask = {
        text: input,
        completed: false,
        dueDate: dueDate || "no due Date",
      };
      setTasks([...tasks, newTask]);
    }
    setInput("");
    setFilter("all");
    setDueDate("");
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
    const matchsSearch = task.text.toLowerCase().includes(search.toLowerCase());
    const matchsFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;
    return matchsSearch && matchsFilter;
  });

  return (
    <div className="todoContainer">
      <h2 color="#000000ff">My To-Do List</h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ padding: "6px", borderRadius: "5px" }}
        />
        <button onClick={handleAddTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
                <small style={{ color: "#555", marginLeft: "10px" }}>
                  due: {task.dueDate}
                </small>
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
