import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../app/store";
import { IEmployee, ISurveypack } from "../../../../types/dataTypes";
import classes from "./OtherSurveyPacks.module.css";
import { useNavigate } from "react-router";
import { initialiseSurveyPacks } from "../../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../../features/user/employeesSlice";
import { IParticipant } from "../../../../types/dataTypes";
import MySurveyPackCard from "./MySurveyPackCard";
import { initialiseSurveys } from "../../../../features/survey/surveysSlice";

const OtherSurveyPacks: React.FC = () => {
  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    dispatch(initialiseEmployees());
    dispatch(initialiseSurveys());
  }, []);

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
  const userId = employees.find((e) => e.email === userEmail)?._id ?? "";

  const excludedSurveyPacks = cleanedSurveyPacks.filter((surveyPack) =>
    surveyPack.employeesTakingSurvey.some(
      (participant: IParticipant) => participant.employee === userId
    )
  );

  console.log(excludedSurveyPacks);

  const handleSurveyPackClick = (packid: string) => {
    navigate(`/othersurveypacks/${packid}`);
  };

  return (
    <div className={classes.otherSurveyPack_container}>
      {" "}
      <h2>Waiting for evaluation</h2>
      <div className={classes.excludedSurveyPacks}>
        {excludedSurveyPacks.map((surveyPack) => (
          <MySurveyPackCard
            key={surveyPack._id}
            surveyPack={surveyPack}
            employees={employees}
            handleSurveyPackClick={handleSurveyPackClick}
          />
        ))}
      </div>
    </div>
  );
};

export default OtherSurveyPacks;
