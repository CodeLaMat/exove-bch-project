import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./Dashboard.module.css";
import PageHeading from "../../pageHeading/PageHeading";
import SurveySummaryChart from "../../hr/dashboard/SurveySummaryChart";
import ProgressBar from "../../hr/dashboard/ProgressBar";
import DBUsers from "../../hr/dashboard/DBUsers";
import DBSurveyList from "../../hr/dashboard/DBSurveyList";
import { UserRole } from "../../../enum";
import { initialiseEmployees } from "../../../features/user/employeesSlice";
import { initialiseEmployees } from "../../../features/user/employeesSlice";
import { initialiseQuestions } from "../../../features/survey/surveySlice";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");

  console.log(employeesList);

  console.log(employeesList);

  useEffect(() => {
    dispatch(initialiseEmployees());
    dispatch(initialiseQuestions());
  }, [dispatch]);

  if (role === UserRole.HR) {
    return (
      <div>
        <div>
          <div>
            <PageHeading pageTitle={t("Dashboard")} />{" "}
          </div>
          <div className={classes.dashboard_container}>
            <div className={classes.dashboard_chart}>
              <h2>{t("Survey Summary")}</h2>
              <SurveySummaryChart />
            </div>{" "}
            <div className={classes.dashboard_gap}></div>
            <div className={classes.dashboard_progress}>
              <h2>{t("Survey Progress")}</h2>
              <ProgressBar />
            </div>
            <div className={classes.dashboard_surList}>
              <h2>{t("List of Surveys")}</h2> <DBSurveyList />
            </div>{" "}
            <div className={classes.dashboard_emplList}>
              <h2>{t("Employees")}</h2>

              <DBUsers />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (role === UserRole.User) {
    return <div>Component for employee role</div>;
  } else if (role === UserRole.Manager) {
    return <div>Component for manager role</div>;
  } else return null;
};

export default Dashboard;
