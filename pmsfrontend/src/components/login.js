import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Updated CSS file

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role); // Assuming API returns user role

                onLogin(data.token);
                navigate("/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Server error");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="facebook-header">
                    <h1 className="facebook-logo">Klick Inc</h1>
                   
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    {error && <p className="error-message">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />

                    <button type="submit" className="submit-button">Log In</button>
                </form>

                <div className="register-section">
                    <p className="register-prompt">New to Klick Inc.?</p>
                    <button onClick={() => navigate("/register")} className="register-button">Create New Account</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
