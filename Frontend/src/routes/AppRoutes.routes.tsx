import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/loginpage";
import { useAuth } from "../services/context/AuthContext";

const AdminRoutes: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuth, role } = useAuth();
  const isAuthenticated = isAuth();
  if (!isAuthenticated && !role) {
    return <h1>Sem moral!</h1>;
  }
  return children;
};

const AuthRoutes: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuth } = useAuth();
  const isAuthenticated = isAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

const PublicRoutes: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuth } = useAuth();
  const isAuthenticated = isAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return children;
};

const RoutesApp: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/home"
        element={
          <AuthRoutes>
            <HomePage />
          </AuthRoutes>
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoutes>
            <h1>ADMIN</h1>
          </AdminRoutes>
        }
      />
    </Routes>
  );
};

export default RoutesApp;
