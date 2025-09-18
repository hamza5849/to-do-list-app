import React, { useState } from "react";

export default function TaskPage({ tasks, setTasks }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const deleteTask = (indexToDelete) => {
    const updated = tasks.filter((_, i) => i !== indexToDelete);
    setTasks(updated);
  };

  const startEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]?.name || "");
  };

  const saveEditTask = (index) => {
    if (editText.trim() === "") return;
    const updated = [...tasks];
    updated[index] = { ...updated[index], name: editText.trim() };
    setTasks(updated);
    setEditIndex(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  const toggleCompleted = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="mb-3">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle w-100"
          type="button"
          onClick={toggleDropdown}
          aria-expanded={dropdownOpen}
        >
          {safeTasks.length > 0 ? `Tasks (${safeTasks.length})` : "No Tasks"}
        </button>
        <ul
  className={`dropdown-menu w-100 ${dropdownOpen ? "show" : ""}`}
  style={{
    maxHeight: "200px",
    overflowY: "auto",
    position: "static", 
    float: "none"
  }}
>

          {safeTasks.length === 0 && (
            <li className="dropdown-item text-center text-muted">
              No tasks added yet.
            </li>
          )}
          {safeTasks.map((task, index) => (
            <li
              key={index}
              className="dropdown-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="me-2"
                  checked={task.completed || false}
                  onChange={() => toggleCompleted(index)}
                />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="form-control form-control-sm"
                    style={{ width: "180px" }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEditTask(index);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                ) : (
                  <span>{task.name || "Unnamed Task"}</span>
                )}
              </div>
              <div>
                {editIndex === index ? (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => saveEditTask(index)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => startEditTask(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
