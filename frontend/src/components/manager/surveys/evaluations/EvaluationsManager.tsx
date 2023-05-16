import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../app/store";
import { IEmployee, ISurveypack } from "../../../../types/dataTypes";
import classes from "./EvaluationsManager.module.css";
import { useNavigate } from "react-router";
import { initialiseSurveyPacks } from "../../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../../features/user/employeesSlice";
import { IParticipant } from "../../../../types/dataTypes";
import { initialiseSurveys } from "../../../../features/survey/surveysSlice";
import EvaluationPackCard from "./EvaluationPackCard";
import PageHeading from "../../../pageHeading/PageHeading";
import { useTranslation } from "react-i18next";

const EvaluationsManager: React.FC = () => {
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

  const userEmail = userData.email;
  const userId = employees.find((e) => e.email === userEmail)?._id ?? "";

  const excludedSurveyPacks = cleanedSurveyPacks.filter((surveyPack) =>
    surveyPack.employeesTakingSurvey.some(
      (participant: IParticipant) => participant.employee === userId
    )
  );

  console.log("Manger", userId);

  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    dispatch(initialiseEmployees());
    dispatch(initialiseSurveys());
  }, []);

  const handleSurveyPackClick = (packid: string) => {
    navigate(`/managerevaluations/${packid}`);
  };

  return (
    <div>
      <PageHeading pageTitle={t("Evaluations")} />

      <div className={classes.otherSurveyPack_container}>
        <div className={classes.otherSurveyPack_container}>
          <h3>Waiting for evaluation</h3>
          <div className={classes.excludedSurveyPacks}>
            {excludedSurveyPacks.map((surveyPack) => (
              <EvaluationPackCard
                key={surveyPack._id}
                surveyPack={surveyPack}
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

export default EvaluationsManager;
