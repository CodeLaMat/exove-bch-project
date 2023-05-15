import React from "react";
import { UserRole } from "../enum";
import Logout from "../components/login/Logout";
import MyProfile from "../components/userProfile/MyProfile";
import Layout from "../pages/Layout";
import CreateSurvey from "../components/hr/surveys/CreateSurvey";
import { RouteConfig } from "../types/dataTypes";
import Dashboard from "../components/shared/dashboard/Dashboard";

import Surveys from "../components/shared/surveys/Surveys";
import Users from "../components/shared/users/Users";
import Analytics from "../components/hr/analytics/Analytics";

import Feedbacks from "../components/hr/feedbacks/Feedbacks";
import Inbox from "../components/shared/surveyPacks/SurveyPacks";
import SurveyPacks from "../components/user/surveys/mySurveyPacks/MySurveyPacks";
import ConfirmParticipants from "../components/hr/confirmParticipants/PendingSurveys";

export const sideMenuRoutes: RouteConfig = {
  [UserRole.HR]: [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Dashboard />,
        },
        {
          path: "surveypacks",
          element: <Inbox />,
        },
        {
          path: "surveys",
          element: <Surveys />,
        },
        {
          path: "createsurvey",
          element: <CreateSurvey />,
        },

        {
          path: "users",
          element: <Users />,
        },
        {
          path: "feedbacks",
          element: <Feedbacks />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "pendingsurveys",
          element: <ConfirmParticipants />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },

        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ],
  [UserRole.Manager]: [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Dashboard />,
        },
        {
          path: "surveypacks",
          element: <Inbox />,
        },

        {
          path: "surveys",
          element: <Surveys />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },

        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ],
  [UserRole.User]: [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Dashboard />,
        },
        {
          path: "surveypacks",
          element: <SurveyPacks />,
        },
        {
          path: "mysurveypacks",
          element: <Inbox />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },

        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ],
};
