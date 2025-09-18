
import React, { useState } from "react";


export default function Todo({ id, name, completed, deleteTask, toggleTaskCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) {
      editTask(id, newName.trim());
      setIsEditing(false);
    }
  };

  const viewTemplate = (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)}
          className="form-check-input me-2"
        />
        <span style={{ textDecoration: completed ? "line-through" : "none" }}>{name}</span>
      </div>
      <div>
        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );

  const editTemplate = (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button type="submit" className="btn btn-primary btn-sm me-2">
        Save
      </button>
      <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
        Cancel
      </button>
    </form>
  );

  return <li className="list-group-item">{isEditing ? editTemplate : viewTemplate}</li>;
}
