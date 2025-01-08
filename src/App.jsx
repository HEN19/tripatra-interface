// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import Homepage from "./components/Homepage";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import PrivateRoute from './PrivateRoute'; 

function App() {
    return (
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard/products" element={<Dashboard />} />
                        </Route>
                        <Route
                            path="/"
                            element={<div>Please log in or register.</div>}
                        />
                    </Routes>
                </ProductProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
