import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails"; // ✅ Make sure this path is correct
import "../styles/Dashboard.css";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false); //  For offcanvas toggle

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      if (onLogout) onLogout();
      navigate("/");
    }
  };

  return (
    <div className="dashboard-container gradient-bg">
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        <h3 className="sidebar-title">
          {role ? role.charAt(0).toUpperCase() + role.slice(1).replace("_", " ") : "User"}
        </h3>
        <ul className="sidebar-links">
          <li><Link to="/projects" onClick={() => setSidebarOpen(false)}>Projects</Link></li>
          <li><Link to="/projectDetails" onClick={() => setSidebarOpen(false)}>Task</Link></li>
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </aside>

      <div className="main-content">
        <header className="dashboard-header">
          <h2>Klick Inc. Dashboard</h2>
        </header>

        {/*  Button to open project details offcanvas */}
        <button className="details-button" onClick={() => setShowDetails(true)}>
          View Project Details
        </button>

        {/*  Projects listing */}
        <Projects />

        {/*  Offcanvas for Project Details */}
        {showDetails && (
          <div className="offcanvas-overlay" onClick={() => setShowDetails(false)}>
            <div className="offcanvas" onClick={(e) => e.stopPropagation()}>
              <button className="close-offcanvas" onClick={() => setShowDetails(false)}>×</button>
              <h3>Project Details</h3>
              <ProjectDetails />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
