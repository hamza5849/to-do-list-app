import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin, tasksByUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter your name.");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters.");
      return;
    }

    // Password complexity: at least one letter, one number, and one special char
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasLetter && hasNumber && hasSpecial)) {
      setError("Password must contain letters, numbers, and special characters.");
      return;
    }

    const userKey = `${trimmedUsername}::${password}`;
    const usernamePrefix = `${trimmedUsername}::`;

    // Check if username exists with a different password
    const usernameExistsWithDifferentPassword = Object.keys(tasksByUser).some(
      (key) => key.startsWith(usernamePrefix) && key !== userKey
    );

    if (usernameExistsWithDifferentPassword) {
      setError("Incorrect password for this username.");
      return;
    }

    // All good, clear error and login
    setError("");
    onLogin(userKey);
    navigate("/tasks");
  };

    
  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center"
      style={{ backgroundColor: "#343a40" }} // dark gray background
    >
      <div
        className="card shadow-lg p-4 rounded"
        style={{ minWidth: "350px", backgroundColor: "#f8f9fa" }} // light gray card background
      >
        <h2 className="mb-4 text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}