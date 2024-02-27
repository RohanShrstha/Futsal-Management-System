import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const location = useLocation();
  return allowedRoles.includes(auth?.roles) ? (
    <Outlet />
  ) : auth?.userName ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
