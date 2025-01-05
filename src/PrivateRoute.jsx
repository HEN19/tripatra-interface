/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
    // Check for token in localStorage or context
    const token = localStorage.getItem("authToken");

    // If token exists, render the route; otherwise, redirect to login
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
