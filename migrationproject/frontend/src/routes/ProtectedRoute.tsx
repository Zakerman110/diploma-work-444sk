import {Navigate} from "react-router-dom";
import {ReactElement, ReactNode} from "react";
import {User} from "../types/user.inteface.ts";

interface ProtectedRouteProps {
    user: User | null;
    requireAdmin?: boolean;
    redirectPath?: string;
    children: ReactNode;
}

const ProtectedRoute = ({user, requireAdmin = false, redirectPath = '/', children}:ProtectedRouteProps): ReactElement | null => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    } else if (requireAdmin) {
        if (!user.is_superuser) {
            return <Navigate to={redirectPath} replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute