import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/app/home" replace /> : <Outlet />;
}
