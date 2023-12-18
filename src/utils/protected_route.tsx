import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    userToken: string;
    redirect?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> =
    ({ children, userToken, redirect= '/auth' }) => {
        if (userToken.trim().length === 0) {
            return <Navigate to={redirect} />;
        }
        return <>{children}</>;
    };
 
export default ProtectedRoute;
