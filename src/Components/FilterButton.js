import React from "react";

export default function FilterButton({ name, isPressed, setFilter, taskCount }) {
  return (
    <button
      type="button"
      className={`btn toggle-btn mx-1 ${isPressed ? "btn-primary" : "btn-outline-primary"}`}
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{name} ({taskCount})</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}
