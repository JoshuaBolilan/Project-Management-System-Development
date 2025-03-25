import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";

// Dashboard component displays user details and a list of registered users
const Dashboard = ({ onLogout }) => {
    const navigate = useNavigate(); // Hook for navigation
    const [users, setUsers] = useState([]); // State for the list of users
    const [user, setUser] = useState(null); // State for the logged-in user details

    // Fetch user details and the list of users when the component mounts
    useEffect(() => {
        fetchUserDetails();
        fetchUsers();
    }, []);

    // Fetch the logged-in user details
    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/user", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data); // Set user details
            }
        } catch (error) {
            console.error("Error fetching user details", error);
        }
    };

    // Fetch the list of all users
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/users", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data); // Set the list of users
            }
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                localStorage.removeItem("token"); // Remove token from local storage
                onLogout(); // Notify parent component about logout
                navigate("/"); // Redirect to the login page
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <div className="sidebar">
                <h2>Welcome, {user ? user.name : "Loading..."}</h2> {/* Display user name */}
                <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>

            {/* Main Content */}
            <div className="main-content">
                <h2>Dashboard</h2>
                <p>Here is the list of registered users.</p>

                {/* Table displaying the list of users */}
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users found.</td> {/* Display message if no users */}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
