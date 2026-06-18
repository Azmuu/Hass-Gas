import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // e.g., "ROLE_ADMIN" or "ROLE_USER"

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Logged in, but doesn't have access
    return (
      <div className="text-center text-xl text-red-600 p-8">
        🚫 Access Denied - You do not have permission to view this page.
      </div>
    );
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
