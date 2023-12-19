import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { userIsLogged } from '../utils/auth_helper.tsx';
interface ProtectedRouteProps {
    children?: ReactNode;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> =
    ({ children, redirect = '/auth' }) => {
        if (userIsLogged()) {
            return <Navigate to={redirect} />;
        }
        return children ? children : <Outlet />;
    };

export default ProtectedRoute;
