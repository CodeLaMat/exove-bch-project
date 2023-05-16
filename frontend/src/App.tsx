import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserRole } from "./enum";
import Layout from "./pages/Layout";
import Login from "./components/login/Login";
import { useAppSelector } from "./hooks/hooks";
import { sideMenuRoutes } from "./routes/Routes";

const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.loginUser);

  const userData = useAppSelector((state) => state.loginUser.userData);
  console.log("userData", userData);
  let role = "";

  if (userData[0]) {
    role = userData[0].role;
  } else {
    role = "user";
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const userRoutes = sideMenuRoutes[role as UserRole];

  if (!userData[0].role) {
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
