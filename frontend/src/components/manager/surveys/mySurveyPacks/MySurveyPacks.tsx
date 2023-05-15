import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { RootState } from "../../../../app/store";
import { IEmployee, ISurveypack } from "../../../../types/dataTypes";
import classes from "./MySurveyPacks.module.css";
import { useNavigate } from "react-router";

import { initialiseSurveyPacks } from "../../../../features/survey/surveyPacksSlice";
import { initialiseEmployees } from "../../../../features/user/employeesSlice";
import PageHeading from "../../../pageHeading/PageHeading";
import MySurveyPackCard from "./MySurveyPackCard";
import { useTranslation } from "react-i18next";

const UserSurveyPacks = () => {
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(initialiseSurveyPacks());
    dispatch(initialiseEmployees());
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

  const includedSurveyPacks = cleanedSurveyPacks.filter((surveyPack) =>
    surveyPack.personBeingSurveyed?.includes(userId)
  );

  const handleSurveyPackClick = (packid: string) => {
    navigate(`/managersurveypacks/${packid}`);
  };

  return (
    <div>
      {" "}
      <PageHeading pageTitle={t("My Surveys")} />
      <div className={classes.mySurveyPack_container}>
        <div className={classes.mySurveyPack_container}>
          <h3>You will be evaluated</h3>
          <div className={classes.includedSurveyPacks}>
            {includedSurveyPacks.map((surveyPack) => (
              <div>
                <MySurveyPackCard
                  key={surveyPack._id}
                  surveyPack={surveyPack}
                  employees={employees}
                  handleSurveyPackClick={handleSurveyPackClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSurveyPacks;
