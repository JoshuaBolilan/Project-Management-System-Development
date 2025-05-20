// App.js - Main application component for routing and authentication
import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Registration from "./components/registration";
import Dashboard from "./components/dashboard";
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

// Main App component
const App = () => {
    // State to store authentication token
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Handle user login, set token in localStorage and state
    const handleLogin = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // Handle user logout, remove token from localStorage and state
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    // Application routes
    return (
        <Router>
            <Routes>
                {/* If authenticated, redirect to dashboard, else show login */}
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
                {/* Registration page */}
                <Route path="/register" element={<Registration />} />
                {/* Dashboard, protected route */}
                <Route path="/dashboard" element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
                {/* Projects list */}
                <Route path="/projects" element={<Projects />} />
                {/* Project details by ID */}
                <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
        </Router>
    );
};

export default App;