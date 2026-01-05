import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRole?: string;
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to={`/${userRole}`} replace />;
    }

    return <>{children}</>;
};
