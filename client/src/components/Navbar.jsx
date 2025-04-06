import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg py-4   navbar-light bg-white fixed-top shadow-sm">
      <div className=" container-fluid px-4 ">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          CodeBuddy.AI 👨‍💻
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              className={`nav-link ${isActive("/") ? "text-primary fw-bold" : "text-dark"}`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`nav-link ${isActive("/explain") ? "text-primary fw-bold" : "text-dark"}`}
              to="/explain"
            >
              Explain Code
            </Link>
            <Link
              className={`nav-link ${isActive("/roadmap") ? "text-primary fw-bold" : "text-dark"}`}
              to="/roadmap"
            >
              Roadmap Builder
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
