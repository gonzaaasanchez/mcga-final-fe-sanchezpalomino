import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    userToken: string;
    children?: ReactNode;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> =
    ({ children, userToken, redirect = '/auth' }) => {
        if (userToken.trim().length === 0) {
            return <Navigate to={redirect} />;
        }
        return children ? children : <Outlet />;
    };

export default ProtectedRoute;
