import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // CSS file for styling the login page

// Login component for authenticating users
const Login = ({ onLogin }) => {
    // States for user input and error handling
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    // Hook for navigation after successful login
    const navigate = useNavigate();

    // Handles form submission for login
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Send POST request to the login API endpoint
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }), // Send email and password
            });

            const data = await response.json(); // Parse response JSON

            if (response.ok) {
                // Save token and role to localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role); // Store user role

                onLogin(data.token); // Trigger parent login handler
                navigate("/dashboard"); // Redirect to dashboard
            } else {
                // Display error message if login fails
                setError(data.message || "Login failed");
            }
        } catch (error) {
            // Handle network/server errors
            setError("Server error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Branding header */}
                <div className="facebook-header">
                    <h1 className="facebook-logo">Klick Inc</h1>
                </div>

                {/* Login form */}
                <form onSubmit={handleLogin} className="login-form">
                    {/* Show error message if any */}
                    {error && <p className="error-message">{error}</p>}

                    {/* Email input field */}
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />

                    {/* Password input field */}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />

                    {/* Submit button */}
                    <button type="submit" className="submit-button">Log In</button>
                </form>

                {/* Section for registration link */}
                <div className="register-section">
                    <p className="register-prompt">New to Klick Inc.?</p>
                    <button 
                        onClick={() => navigate("/register")} 
                        className="register-button"
                    >
                        Create New Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
