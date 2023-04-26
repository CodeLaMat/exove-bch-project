import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import classes from "./Dashboard.module.css";
import PageHeading from "../../pageHeading/PageHeading";
import SurveySummaryChart from "../../hr/dashboard/SurveySummaryChart";
import ProgressBar from "../../hr/dashboard/ProgressBar";
import DBUsers from "../../hr/dashboard/DBUsers";
import DBSurveyList from "../../hr/dashboard/DBSurveyList";
import { UserRole } from "../../../enum";
import { initialiseEmployees } from "../../../features/user/userListSlice";
import { initialiseQuestions } from "../../../features/survey/surveySlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const employeesList = useAppSelector((state) => state.employees.employees);

  const userData = useAppSelector((state) => state.loginUser.userData);
  const user = userData[0];
  const role = user.role.join("");

  useEffect(() => {
    dispatch(initialiseEmployees());
    dispatch(initialiseQuestions());
  }, [dispatch]);

  if (role === UserRole.HR) {
    return (
      <div>
        <div>
          <div>
            <PageHeading pageTitle="DashBoard" />{" "}
          </div>
          <div className={classes.dashboard_container}>
            <div className={classes.dashboard_chart}>
              <h2>Survey Summary</h2>
              <SurveySummaryChart />
            </div>{" "}
            <div className={classes.dashboard_gap}></div>
            <div className={classes.dashboard_progress}>
              <h2>Survey Progress</h2>
              <ProgressBar />
            </div>
            <div className={classes.dashboard_surList}>
              <h2>List of Surveys</h2> <DBSurveyList />
            </div>{" "}
            <div className={classes.dashboard_emplList}>
              <h2>Employees</h2>

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
