import React, { useEffect } from "react";
import classes from "./HRDashboard.module.css";
import { Table } from "react-bootstrap";
import { ISurvey } from "../../../types/dataTypes";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../app/store";
import { initialiseSurveys } from "../../../features/survey/surveysSlice";
import { useTranslation } from "react-i18next";

const DBSurveyList = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const surveys: ISurvey[] = useAppSelector(
    (state: RootState) => state.surveys.surveys
  );
  useEffect(() => {
    dispatch(initialiseSurveys());
  }, [dispatch]);

  return (
    <div className={classes.surveys_container}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>{t("Survey ID")}</th>
            <th>{t("Survey Name")}</th>
            <th>{t("Description")}</th>
            <th>{t("Questions")}</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey: ISurvey) => (
            <tr key={survey._id}>
              <td>{survey._id}</td>
              <td>{survey.surveyName}</td>
              <td>{survey.description}</td>
              <td>
                <ul>
                  {survey.questions.map((question) => (
                    <li key={question._id}>{question.question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DBSurveyList;
