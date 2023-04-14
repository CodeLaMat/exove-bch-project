import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserRole } from "../enum";
import { useAppSelector } from "../hooks/hooks";
import Info from "../components/userProfile/Info";
import Logout from "../components/login/Logout";
import MyProfile from "../components/userProfile/MyProfile";
import Main from "./templates/main/Main";
import CreateSurvey from "../components/hr/surveys/CreateSurvey";
import Dashboard from "../components/shared/dashboard/Dashboard";
import Inbox from "../components/shared/inbox/Inbox";
import Surveys from "../components/shared/surveys/Surveys";
import Users from "../components/shared/users/Users";
import Questionnaire from "../components/shared/questionnaire/Questionnaire";
import Analytics from "../components/shared/analytics/Analytics";
import FileFolders from "../components/shared/fileFolders/FileFolders";

const MainRoutes = () => {
  const { selectedRole } = useAppSelector((state) => state.loginUser);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="/inbox" element={<Inbox />}></Route>
          <Route path="/surveys" element={<Surveys />}></Route>{" "}
          <Route
            path="/createsurvey"
            element={selectedRole === UserRole.HR ? <CreateSurvey /> : null}
          />
          <Route path="/users" element={<Users />}></Route>
          <Route path="/questionnaire" element={<Questionnaire />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/filesfolders" element={<FileFolders />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>

        <Route path="*">This page could not be found</Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
