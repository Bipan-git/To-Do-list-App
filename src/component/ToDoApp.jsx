import React, { useState } from "react";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [filter, setFilter] = useState("all");

  //add new task
  const handleAddTask = () => {
    if (input.trim() === "") return;

    if (isEditing) {
      //updated tasks immutably
      const updatedTasks = [...tasks];
      updatedTasks[currentIndex].text = input;
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput("");
  };
  //delete task

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //edit task
  const handleEditTask = (index) => {
    setIsEditing(true);
    setCurrentIndex(index);
    setInput(tasks[index].text);
  };
  //toggle completre
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  //filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="todoContainer">
      <h2>My To-Do-list</h2>

      <div className="input-area">
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
      <div className="filter-section">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>pending</button>
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
                style={{ background: "black" }}
                onClick={() => handleEditTask(index)}
              >
                Edit{" "}
              </button>
              <button
                style={{ background: "black" }}
                onClick={() => handleDeleteTask(index)}
              >
                Delete{" "}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p> No Tasks to show</p>
      )}
    </div>
  );
}
