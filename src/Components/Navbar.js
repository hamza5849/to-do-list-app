import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MyNavbar({ user, onLogout, darkMode, }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${
        darkMode ? "navbar-dark" : "navbar-light"
      }`}
      style={{
        backgroundColor: darkMode ? "#2f2f2f" : "#637AB9",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {user ? (
              <>
                
                
                <li className="nav-item">
                  <button
                    className={`btn btn-sm ${
                      darkMode ? "btn-outline-light" : "btn-light text-dark"
                    }`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`btn btn-sm ${
                    darkMode ? "btn-outline-light" : "btn-light text-dark"
                  }`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
