import axios from "axios";

const API_URL = "http://localhost:8080/v1/user"; 

// Registration request
export const register = async (username, password, first_name,last_name, gender,telephone,email, address) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            username,
            password,
            first_name,
            last_name,
            gender,
            telephone,
            email,
            address
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Registration failed!";
    }
};

// Login request
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Login failed!";
    }
};

// Profille Request
export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to fetch profile!";
    }
};
