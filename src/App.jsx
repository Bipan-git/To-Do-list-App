import React from "react";
import "./App.css";
import ToDoApp from "./component/ToDoApp";

export default function App() {
  return (
    <div className="contanier">
      <h1>📝To Do List</h1>
      <ToDoApp />
    </div>
  );
}
