import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserRole } from "../enum";
import { useAppSelector } from "../hooks/hooks";
import Logout from "../components/login/Logout";
import MyProfile from "../components/userProfile/MyProfile";
import Main from "./templates/main/Main";
import CreateSurvey from "../components/hr/surveys/CreateSurvey";
import Dashboard from "../components/shared/dashboard/Dashboard";
import Surveys from "../components/shared/surveys/Surveys";
import Users from "../components/shared/users/Users";
import Feedbacks from "../components/hr/feedbacks/Feedbacks";
import Analytics from "../components/hr/analytics/Analytics";

import FeedbackSingle from "../components/hr/feedbacks/FeedbackSingle";
import CreateForm from "../components/hr/users/CreateForm";
import UserSurveyPacks from "../components/user/surveys/mySurveyPacks/MySurveyPacks";
import UserSurveyPackDetails from "../components/user/surveys/mySurveyPacks/MySurveyPackDetails";
import UserEvaluationPackDetails from "../components/user/surveys/evaluations/EvaluationPackDetails";
import EvaluationsUser from "../components/user/surveys/evaluations/EvaluationsUser";
import EvaluationManager from "../components/manager/surveys/evaluations/EvaluationsManager";
import ManagerSurveyPacksDetails from "../components/manager/surveys/mySurveyPacks/MySurveyPackDetails";
import ManagerPackDetails from "../components/manager/surveys/managerTeam/TeamPackDetails";
import ManagerSurveyPacks from "../components/manager/surveys/mySurveyPacks/MySurveyPacks";
import ManagerEvaluationPackDetails from "../components/manager/surveys/evaluations/EvaluationPackDetails";
import ManagerTeam from "../components/manager/surveys/managerTeam/ManagerTeam";
import ConfirmParticipants from "../components/hr/confirmParticipants/PendingSurveys";
import PendingPackDetails from "../components/hr/confirmParticipants/PendingPackDetails";

const MainRoutes = () => {
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route
            path="/surveys"
            element={role === UserRole.HR ? <Surveys /> : <Navigate to="/" />}
          ></Route>{" "}
          <Route
            path="/createsurvey"
            element={
              role === UserRole.HR ? <CreateSurvey /> : <Navigate to="/" />
            }
          />{" "}
          <Route
            path="/analytics"
            element={role === UserRole.HR ? <Analytics /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/pendingsurveys"
            element={
              role === UserRole.HR ? (
                <ConfirmParticipants />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/pendingsurveys/:surveyid"
            element={
              role === UserRole.HR ? (
                <PendingPackDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/employees"
            element={role === UserRole.HR ? <Users /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/feedbacks"
            element={role === UserRole.HR ? <Feedbacks /> : <Navigate to="/" />}
          ></Route>{" "}
          <Route
            path="/feedbacks/:packid"
            element={
              role === UserRole.HR ? <FeedbackSingle /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/sendForm/:userid"
            element={
              role === UserRole.HR ? <CreateForm /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/userevaluations"
            element={
              role === UserRole.User ? <EvaluationsUser /> : <Navigate to="/" />
            }
          ></Route>{" "}
          <Route
            path="/userevaluations/:userpackid"
            element={
              role === UserRole.User ? (
                <UserEvaluationPackDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>{" "}
          <Route
            path="/usersurveypacks"
            element={
              role === UserRole.User ? <UserSurveyPacks /> : <Navigate to="/" />
            }
          ></Route>
          <Route
            path="/usersurveypacks/:packid"
            element={
              role === UserRole.User ? (
                <UserSurveyPackDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>{" "}
          <Route
            path="/managersurveypacks"
            element={
              role === UserRole.Manager ? (
                <ManagerSurveyPacks />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/managersurveypacks/:packid"
            element={
              role === UserRole.Manager ? (
                <ManagerSurveyPacksDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/managerevaluations"
            element={
              role === UserRole.Manager ? (
                <EvaluationManager />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>
          <Route
            path="/managerevaluations/:packid"
            element={
              role === UserRole.Manager ? (
                <ManagerEvaluationPackDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>{" "}
          <Route
            path="/managerteam"
            element={
              role === UserRole.Manager ? <ManagerTeam /> : <Navigate to="/" />
            }
          ></Route>{" "}
          <Route
            path="/managerteam/:teampackid"
            element={
              role === UserRole.Manager ? (
                <ManagerPackDetails />
              ) : (
                <Navigate to="/" />
              )
            }
          ></Route>{" "}
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
