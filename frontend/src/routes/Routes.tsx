import React from "react";
import { UserRole } from "../enum";
import Info from "../components/userProfile/Info";
import Logout from "../components/login/Logout";
import MyProfile from "../components/userProfile/MyProfile";
import Layout from "../pages/Layout";
import HRInbox from "../components/hr/inbox/HRInbox";
import HRSurveys from "../components/hr/surveys/HRSurveys";
import CreateSurvey from "../components/hr/surveys/CreateSurvey";
import ListSurveys from "../components/hr/surveys/ListSurveys";
import SurveyChoice from "../components/hr/surveys/SurveyChoice";
import HRUsers from "../components/hr/users/HRUsers";
import HRQuestionnaire from "../components/hr/questionnaire/HRQuestionnaire";
import HRAnalytics from "../components/hr/analytics/HRAnalytics";
import HRFileFolders from "../components/hr/fileFolders/FileFolders";
import { RouteConfig } from "../redux/types/dataTypes";
import ManagerInbox from "../components/manager/inbox/ManagerInbox";
import ManagerDashboard from "../components/manager/dashboard/ManagerDashboard";
import ManagerSurveys from "../components/manager/surveys/ManagerSurveys";
import ManagerAnalytics from "../components/manager/analytics/ManagerAnalytics";
import UserInbox from "../components/user/inbox/UserInbox";
import HRDashboard from "../components/hr/dashboard/HRDashboard";
import UserDashboard from "../components/user/dashboard/UserDashboard";

export const sideMenuRoutes: RouteConfig = {
  [UserRole.HR]: [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <HRDashboard />,
        },
        {
          path: "inbox",
          element: <HRInbox />,
        },
        {
          path: "surveys",
          element: <HRSurveys />,
        },
        {
          path: "SurveyChoice",
          element: <SurveyChoice />,
        },
        {
          path: "createsurvey",
          element: <CreateSurvey />,
        },
        {
          path: "ListSurveys",
          element: <ListSurveys />,
        },
        {
          path: "users",
          element: <HRUsers />,
        },
        {
          path: "questionnaire",
          element: <HRQuestionnaire />,
        },
        {
          path: "analytics",
          element: <HRAnalytics />,
        },
        {
          path: "filesfolders",
          element: <HRFileFolders />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },
        {
          path: "info",
          element: <Info />,
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
          element: <ManagerDashboard />,
        },
        {
          path: "inbox",
          element: <ManagerInbox />,
        },

        {
          path: "surveys",
          element: <ManagerSurveys />,
        },
        {
          path: "analytics",
          element: <ManagerAnalytics />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },
        {
          path: "info",
          element: <Info />,
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
          element: <UserDashboard />,
        },
        {
          path: "inbox",
          element: <UserInbox />,
        },
        {
          path: "myprofile",
          element: <MyProfile />,
        },
        {
          path: "info",
          element: <Info />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ],
};
