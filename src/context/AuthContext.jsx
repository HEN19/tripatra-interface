/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";
import { login, register, getProfile } from "../api/user"; // Import API functions
import { useNavigate } from "react-router-dom";

// Create a context for managing user authentication state
const AuthContext = createContext();

// Custom hook to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around the application and provide state
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Track the logged-in user
    const [error, setError] = useState(""); // Track any errors
    const [loading, setLoading] = useState(false); // Track loading state
    const navigate = useNavigate();

    // Login function
    const handleLogin = async (username, password) => {
    setLoading(true);
    try {
        const response = await login(username, password); // Call the login API
        const apiData = response.API;

        if (apiData.success) {
            const token = apiData.content; // Extract the JWT token from the response
            localStorage.setItem("authToken", token); // Save the token in localStorage
            setUser({ username, token }); // Optionally set user state for context
            setError(""); // Clear any previous errors
        } else {
            throw new Error(apiData.message || "Login failed");
        }
    } catch (error) {
        setError(error.message || "An unexpected error occurred");
    } finally {
        setLoading(false);
    }
    };

    // Registration function
    const handleRegister = async (username, password, firstname,lastname, gender,telephone,email, address) => {
        setLoading(true);
        try {
            const data = await register(username, password, firstname,lastname, gender,telephone,email, address);
            setUser(data); // Set the user object after successful registration
            setError(""); // Clear any previous errors
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Get user profile function (for authenticated user)
    const handleProfile = async (token) => {
        try {
            const data = await getProfile(token); // Pass token to the API to fetch profile data
            setUser(data); // Set user data
        } catch (error) {
            setError(error);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
    
        localStorage.removeItem("authToken");
    
        setError("");
        navigate("/login")
    };
    

    return (
        <AuthContext.Provider
            value={{ user, handleLogin, handleRegister, handleProfile, logout, error, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
