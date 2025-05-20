import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails";
import "../styles/Dashboard.css";

// Dashboard component that handles user role display, navigation, project listing, and logout functionality
const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [role, setRole] = useState(""); // Stores the current user role
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controls sidebar visibility
  const [showDetails, setShowDetails] = useState(false); // Controls visibility of the Project Details offcanvas

  // Load user role from localStorage when the component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  // Handles user logout by sending a request to the API and clearing localStorage
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
      if (onLogout) onLogout(); // Trigger any parent logout actions
      navigate("/"); // Redirect to home/login page
    }
  };

  return (
    <div className="dashboard-container gradient-bg">
      {/* Sidebar Toggle Button */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>×</button>
        {/* Display formatted user role */}
        <h3 className="sidebar-title">
          {role ? role.charAt(0).toUpperCase() + role.slice(1).replace("_", " ") : "User"}
        </h3>
        <ul className="sidebar-links">
          <li>
            {/* Link to Projects Page */}
            <Link to="/projects" onClick={() => setSidebarOpen(false)}>Projects</Link>
          </li>
          <li>
            {/* Button to show Project Details offcanvas */}
            <button onClick={() => { setShowDetails(true); setSidebarOpen(false); }}>Task</button>
          </li>
          <li>
            {/* Logout button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Klick Inc. Dashboard</h2>
        </header>

        {/* button to view Project Details */}
        <button className="details-button" onClick={() => setShowDetails(true)}>
          View Project Details
        </button>

        {/* Display list  projects */}
        <Projects />

        {/* Offcanvas panel to show project details */}
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
