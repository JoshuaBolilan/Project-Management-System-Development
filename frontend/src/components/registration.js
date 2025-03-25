import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css"; // Import the CSS file

// Registration component handles user registration
const Registration = () => {
    const [name, setName] = useState(""); // State for name input
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input
    const [role, setRole] = useState("team_member"); // State for user role selection
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle registration form submission
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (password !== confirmPassword) {
            setError("Passwords do not match"); // Validate password confirmation
            return;
        }

        try {
            // Send registration request to the server
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, password_confirmation: confirmPassword, role }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/"); // Redirect to the login page
            } else {
                setError(data.message || "Registration failed"); // Display error message
            }
        } catch (error) {
            setError("Server error"); // Handle server errors
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">Create a New Account</h2>
                {error && <p className="auth-error">{error}</p>} {/* Display error message if any */}
                <form onSubmit={handleRegister}>
                    {/* Name input field */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="auth-input"
                    />
                    {/* Email input field */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="auth-input"
                    />
                    {/* Password input field */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="auth-input"
                    />
                    {/* Confirm password input field */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="auth-input"
                    />
                    {/* Role selection dropdown */}
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-input">
                        <option value="project_manager">Project Manager</option>
                        <option value="team_member">Team Member</option>
                        <option value="client">Client</option>
                    </select>
                    {/* Sign up button */}
                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                {/* Button to navigate back to the login page */}
                <button onClick={() => navigate("/")} className="auth-register">Back to Login</button>
            </div>
        </div>
    );
};

export default Registration;
