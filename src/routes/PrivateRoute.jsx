import React from 'react';
import { getToken } from "../utilitis/sessionHelper.js";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const token = getToken();

    if (!token || !user) {
        toast.error("You must be logged in!");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default PrivateRoute;
