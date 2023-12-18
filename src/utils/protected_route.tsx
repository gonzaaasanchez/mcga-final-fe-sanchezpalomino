import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userisLogged } from '../utils/auth_helper';
interface ProtectedRouteProps {
    children?: ReactNode;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> =
    ({ children, redirect = '/auth' }) => {
        if (userisLogged()) {
            return <Navigate to={redirect} />;
        }
        return children ? children : <Outlet />;
    };

export default ProtectedRoute;
