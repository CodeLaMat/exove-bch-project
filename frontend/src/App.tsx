import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserRole } from "./enum";
import Layout from "./pages/Layout";
import Login from "./components/login/Login";
import { useAppSelector } from "./hooks/hooks";
import { sideMenuRoutes } from "./routes/Routes";

const App = () => {
  const { isAuthenticated, selectedRole } = useAppSelector(
    (state) => state.loginUser
  );
  const userRoutes = sideMenuRoutes[selectedRole as UserRole];

  if (!isAuthenticated) {
    return <Login />;
  }

  if (!selectedRole) {
    return null;
  }

  const routes = userRoutes[0].children.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Layout />}>
          {routes}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
