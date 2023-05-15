import React, { useEffect } from "react";
import { UserRole } from "../../../enum";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { ISurvey } from "../../../types/dataTypes";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import HRSurveys from "../../hr/surveys/HRSurveys";
import ManagerSurveys from "../../manager/surveys/ManagerSurveys";
import UserSurveys from "../../user/surveys/surveyPacks/UserSurveyPacks";

const Surveys = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.loginUser.userData);
  const role = userData[0].role.join("");
  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  if (role === UserRole.HR) {
    return (
      <div>
        <HRSurveys />
      </div>
    );
  } else if (role === UserRole.User) {
    return (
      <div>
        <UserSurveys />
      </div>
    );
  } else if (role === UserRole.Manager) {
    return (
      <div>
        <ManagerSurveys />
      </div>
    );
  } else return null;
};

export default Surveys;
