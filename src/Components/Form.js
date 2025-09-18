import React, { useState } from "react";

export default function Form({ addTask }) {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;

    addTask({ name: taskInput.trim() });
    setTaskInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2">
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add new task"
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}
