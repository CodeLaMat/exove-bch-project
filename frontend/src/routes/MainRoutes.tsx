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
import Inbox from "../components/shared/surveyPacks/SurveyPacks";
import Surveys from "../components/shared/surveys/Surveys";
import Users from "../components/shared/users/Users";
import Feedbacks from "../components/shared/feedbacks/Feedbacks";
import Analytics from "../components/shared/analytics/Analytics";
import FileFolders from "../components/shared/fileFolders/FileFolders";
import FeedbackSingle from "../components/shared/feedbacks/FeedbackSingle";

import CreateForm from "../components/hr/users/CreateForm";
import SurveyPackDetails from "../components/user/surveys/mySurveyPacks/MySurveyPackDetails";
import SurveyPacks from "../components/user/surveys/mySurveyPacks/MySurveyPacks";
import OtherSurveyPackDetails from "../components/user/surveys/surveyPacks/OtherSurveyPackDetails";
import OtherSurveyPacks from "../components/user/surveys/surveyPacks/OtherSurveyPacks";

const MainRoutes = () => {
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="/mysurveypacks" element={<Inbox />}></Route>
          <Route
            path="/mysurveypacks/:packid"
            element={<SurveyPackDetails />}
          ></Route>{" "}
          <Route path="/surveys" element={<Surveys />}></Route>{" "}
          <Route
            path="/createsurvey"
            element={
              role === UserRole.HR ? <CreateSurvey /> : <Navigate to="/" />
            }
          />
          <Route path="/users" element={<Users />}></Route>
          <Route path="/feedbacks" element={<Feedbacks />}></Route>{" "}
          <Route path="/feedbacks/:id" element={<FeedbackSingle />}></Route>
          <Route
            path="/othersurveypacks"
            element={<OtherSurveyPacks />}
          ></Route>
          <Route
            path="/othersurveypacks/:packid"
            element={<OtherSurveyPackDetails />}
          ></Route>
          <Route path="/sendForm/:userid" element={<CreateForm />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/filesfolders" element={<FileFolders />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
