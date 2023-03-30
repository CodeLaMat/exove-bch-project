import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/hr/dashboard/Dashboard";
import Info from "./components/Info";
import Logout from "./components/login/Logout";
import MyProfile from "../src/components/userProfile/MyProfile";
import Layout from "./pages/Layout";
import Inbox from "./components/hr/inbox/Inbox";
import Surveys from "./components/hr/surveys/Surveys";
import Users from "./components/hr/users/Users";
import Questionnaire from "./components/hr/questionnaire/Questionnaire";
import Analytics from "./components/hr/analytics/Analytics";
import FileFolders from "./components/hr/fileFolders/FileFolders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="/home" element={<Dashboard />}>
              {" "}
            </Route>
            <Route path="/inbox" element={<Inbox />}>
              {" "}
            </Route>
            <Route path="/surveys" element={<Surveys />}>
              {" "}
            </Route>
            <Route path="/users" element={<Users />}>
              {" "}
            </Route>
            <Route path="/questionnaire" element={<Questionnaire />}>
              {" "}
            </Route>
            <Route path="/analytics" element={<Analytics />}>
              {" "}
            </Route>
            <Route path="/filesfolders" element={<FileFolders />}>
              {" "}
            </Route>
            <Route path="/myprofile" element={<MyProfile />}>
              {" "}
            </Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
