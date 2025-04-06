import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const location = useLocation();
  const navbarCollapseRef = useRef(null);
  const togglerRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    closeNavbar();
  }, [location]);

  const closeNavbar = () => {
    if (window.innerWidth < 992) {
      if (navbarCollapseRef.current && 
          navbarCollapseRef.current.classList.contains('show')) {
        if (window.bootstrap && window.bootstrap.Collapse) {
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapseRef.current);
          bsCollapse.hide();
        } else if (togglerRef.current) {
          togglerRef.current.setAttribute('aria-expanded', 'false');
          navbarCollapseRef.current.classList.remove('show');
        }
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg py-4 navbar-light bg-white fixed-top shadow-sm">
      <div className="container-fluid px-4">
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
          ref={togglerRef}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div 
          className="collapse navbar-collapse justify-content-end" 
          id="navbarNavAltMarkup"
          ref={navbarCollapseRef}
        >
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
