/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";
import { login, register, getProfile } from "../api/user"; // Import API functions
import { useNavigate } from "react-router-dom";

// Create a context for managing user authentication state
const AuthContext = createContext();
const token = localStorage.getItem("authToken");


// Custom hook to access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around the application and provide state
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    // Login function
    const handleLogin = async (username, password) => {
    setLoading(true);
    try {
        const response = await login(username, password); 
        const apiData = response.API;

        if (apiData.success) {
            const token = apiData.content; 
            localStorage.setItem("authToken", token); 
            setUser({ username, token }); 
            setError(""); 
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
            setUser(data); 
            setError(""); 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // Get user profile function (for authenticated user)
    const handleProfile = async () => {
        setLoading(true)
        
        try {
            const response = await getProfile(token);
            setUser(response.API.content);        
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch user";
            setError(errorMessage)
            throw new Error(errorMessage);        
        } finally {
            setLoading(false);
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
