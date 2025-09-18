import React, { useState, useEffect } from "react";
import Login from "./Components/Login";
import TaskPage from "./Components/TaskPage";
import Form from "./Components/Form";
import Navbar from "./Components/Navbar";

// helper to format date display
function formatDateDisplay(dateObj) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString(undefined, options);
}

export default function App() {
  // Load initial user from localStorage or null
  const [user, setUser] = useState(() => localStorage.getItem("user") || null);

  // Load initial tasksByUser from localStorage or empty object
  const [tasksByUser, setTasksByUser] = useState(() => {
    const saved = localStorage.getItem("tasksByUser");
    return saved ? JSON.parse(saved) : {};
  });

  const [todayStr, setTodayStr] = useState("");

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTodayStr(formatDateDisplay(now));
  }, []);

  // Persist user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Persist tasksByUser to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("tasksByUser", JSON.stringify(tasksByUser));
  }, [tasksByUser]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const userTasks = user && tasksByUser[user] ? tasksByUser[user] : [];

  const addTask = (newTask) => {
    setTasksByUser((prev) => ({
      ...prev,
      [user]: [...(prev[user] || []), newTask],
    }));
  };

  const setUserTasks = (newTasks) => {
    setTasksByUser((prev) => ({
      ...prev,
      [user]: newTasks,
    }));
  };

  if (!user) {
    return <Login onLogin={handleLogin} tasksByUser={tasksByUser} />;
  }

  const displayName = user ? user.split("::")[0] : null;

  return (
    <>
      <div
        className={`container-fluid d-flex flex-column min-vh-100 ${
          darkMode ? "text-white" : "text-dark"
        }`}
        style={{
          backgroundColor: darkMode ? "#2f2f2f" : "#f0f2f8",
        }}
      >
        {/* Header with Dark/Light Mode Switch */}
        <header
          className="p-3"
          style={{ backgroundColor: darkMode ? "#2f2f2f" : "#637AB9", color: "white" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            

            {/* Dark/Light Mode Switch */}
            <div className="form-check form-switch text-white">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </label>
            </div>
          </div>
        </header>

        {/* Navbar */}
        <Navbar
          user={displayName}
          onLogout={handleLogout}
          darkMode={darkMode}
        />

        {/* Date Display */}
        <div className="text-center my-3">
          <h5>📅 {todayStr}</h5>
        </div>

        {/* Main Card Box */}
        <div
          className="card shadow p-4 mx-auto"
          style={{
            maxWidth: "600px",
            backgroundColor: darkMode ? "#3c3c3c" : "#ffffff",
            color: darkMode ? "#f1f1f1" : "#000000",
          }}
        >
          <h3 className="text-center mb-3">Welcome, {displayName}!</h3>
          <h5 className="text-center mb-4">Your Tasks:</h5>

          {/* Form to Add Task */}
          <Form addTask={addTask} />

          {/* Task List */}
          <div className="mt-3">
            <TaskPage tasks={userTasks} setTasks={setUserTasks} />
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center py-3 mt-auto"
          style={{
            backgroundColor: darkMode ? "#2f2f2f" : "#637AB9",
            color: "white",
          }}
        >
          <small>© {new Date().getFullYear()} . All rights reserved.</small>
        </footer>
      </div>
    </>
  );
}
