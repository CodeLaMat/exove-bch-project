import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { IEmployee, ISurveypack } from "../../../types/dataTypes";
import classes from "./PendingSurveys.module.css";
import { useNavigate } from "react-router";
import { initialiseSurveyPacks } from "../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../features/user/employeesSlice";
import { IParticipant } from "../../../types/dataTypes";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import TeamPackCard from "./PendingPackCard";
import PageHeading from "../../pageHeading/PageHeading";
import { useTranslation } from "react-i18next";

const ManagerTeam: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const employees: IEmployee[] = useAppSelector(
    (state: RootState) => state.employees.employees
  );
  const surveyPacks: ISurveypack[] = useAppSelector(
    (state: RootState) => state.surveyPacks.surveyPacks
  );
  const userData = useAppSelector((state) => state.loginUser.userData?.[0]);

  const surveyPacksArray = Object.values(surveyPacks);
  const cleanedSurveyPacks = Object.values(surveyPacksArray[0]);

  const userEmail = userData.email.join("");
  // const userId = employees.find((e) => e.email === userEmail)?._id ?? "";

  const teamSurveyPacks = cleanedSurveyPacks.filter(
    (surveyPack) =>
      surveyPack.employeesTakingSurvey.length >= 0 && !surveyPack.hrapproved
  );

  console.log("UserEmail", userEmail);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    dispatch(initialiseEmployees());
    dispatch(initialiseSurveys());
  }, []);

  const handleSurveyPackClick = (surveyid: string) => {
    navigate(`/pendingsurveys/${surveyid}`);
  };

  return (
    <div>
      <PageHeading pageTitle={t("Team Surveys")} />
      <div className={classes.otherSurveyPack_container}>
        <div className={classes.otherSurveyPack_container}>
          <h3>Waiting for the approval</h3>
          <div className={classes.excludedSurveyPacks}>
            {teamSurveyPacks.map((teamPack) => (
              <TeamPackCard
                key={teamPack._id}
                surveyPack={teamPack}
                employees={employees}
                handleSurveyPackClick={handleSurveyPackClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTeam;
