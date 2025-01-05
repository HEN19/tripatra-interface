/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './PrivateRoute'; 

function App() {
    return (
        
            <Router>
                <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route
                        path="/"
                        element={<div>Please log in or register.</div>}
                    />
                </Routes>
                </AuthProvider>
            </Router>
    );
}

export default App;
