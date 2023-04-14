import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserRole } from "./enum";
import Layout from "./pages/Layout";
import Login from "./components/login/Login";
import { useAppSelector } from "../src/redux/hooks/hooks";
import { sideMenuRoutes } from "./routes/Routes";

const App = () => {
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );
  const userRoutes = sideMenuRoutes[selectedRole as UserRole];

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login />
      ) : UserRole ? (
        <Routes>
          <Route path="/" element={<Layout />}>
            {userRoutes[0].children.map(
              (route: { path: string; element: JSX.Element }) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )}
          </Route>
        </Routes>
      ) : null}
    </div>
  );
};

export default App;
