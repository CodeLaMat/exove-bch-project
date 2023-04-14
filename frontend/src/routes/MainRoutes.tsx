import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserRole } from "../enum";
import { useAppSelector } from "../../src/redux/hooks/hooks";
import Info from "../components/userProfile/Info";
import Logout from "../components/login/Logout";
import MyProfile from "../components/userProfile/MyProfile";
import Main from "./templates/main/Main";
import HRDashboard from "../components/hr/dashboard/HRDashboard";
import HRInbox from "../components/hr/inbox/HRInbox";
import HRSurveys from "../components/hr/surveys/HRSurveys";
import HRUsers from "../components/hr/users/HRUsers";
import HRQuestionnaire from "../components/hr/questionnaire/HRQuestionnaire";
import HRAnalytics from "../components/hr/analytics/HRAnalytics";
import HRFilesFolders from "../components/hr/fileFolders/FileFolders";
import ManagerDashboard from "../components/manager/dashboard/ManagerDashboard";
import ManagerInbox from "../components/manager/inbox/ManagerInbox";
import ManagerSurveys from "../components/manager/surveys/ManagerSurveys";
import UserDashboard from "../components/user/dashboard/UserDashboard";
import UserInbox from "../components/user/inbox/UserInbox";
import CreateSurvey from "../components/hr/surveys/CreateSurvey";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MainRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.loginUser);
  // const { selectedRole } = useAppSelector((state) => state.loginUser);
  
  const userData = useSelector((state: RootState) => state.user.userData[0]);
  const selectedRole  = userData.role;


  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route
            index
            element={
              selectedRole === "hr" ? (
               <HRDashboard />
               
              ) : selectedRole === UserRole.Manager ? (
                <ManagerDashboard />
                
              ) : selectedRole === UserRole.User ? (
               <UserDashboard />
                
              ) :  <h1>undefined</h1>
            }
          ></Route>
          <Route
            path="/home"
            element={
              selectedRole === UserRole.HR ? (
                 <HRDashboard />
               
              ) : selectedRole === UserRole.Manager ? (
                <ManagerDashboard />
                
              ) : selectedRole === UserRole.User ? (
               <UserDashboard />
                
              ) : <h1>undefined</h1>
            }
          ></Route>
          <Route
            path="/inbox"
            element={
              selectedRole === UserRole.HR ? (
                <HRInbox />
              ) : selectedRole === UserRole.Manager ? (
                <ManagerInbox />
              ) : selectedRole === UserRole.User ? (
                <UserInbox />
              ) : null
            }
          ></Route>
          <Route
            path="/surveys"
            element={
              selectedRole === UserRole.HR ? (
                <HRSurveys />
              ) : selectedRole === UserRole.Manager ? (
                <ManagerSurveys />
              ) : null
            }
          ></Route>{" "}
          <Route
            path="/createsurvey"
            element={selectedRole === UserRole.HR ? <CreateSurvey /> : null}
          />
          <Route
            path="/users"
            element={selectedRole === UserRole.HR ? <HRUsers /> : null}
          ></Route>
          <Route
            path="/questionnaire"
            element={selectedRole === UserRole.HR ? <HRQuestionnaire /> : null}
          ></Route>
          <Route
            path="/analytics"
            element={selectedRole === UserRole.HR ? <HRAnalytics /> : null}
          ></Route>
          <Route
            path="/filesfolders"
            element={selectedRole === UserRole.HR ? <HRFilesFolders /> : null}
          ></Route>
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
